import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ParametersService, RGOptions } from '../parameters.service';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { StringDecoder, NodeStringDecoder } from 'string_decoder';
import { MatchesService, Word } from '../matches.service';

const childProcess = (<any>window).require('child_process');
const { platform } = (<any>window).require('process');
let { rgPath } = (<any>window).require('rg-manseeks');
rgPath = rgPath.replace('app.asar', 'app.asar.unpacked');


@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WordlistComponent implements AfterViewInit {
  collection: string[];
  options: RGOptions;
  displayedColumns = ['word', 'frequency'];
  wordList = new MatTableDataSource<Word>([]);
  wl: WordFreqDist;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private parameters: ParametersService,
              public snackbar: MatSnackBar,
              private changes: ChangeDetectorRef,
              private matches: MatchesService) { }

  openSnackBar(message: string) {
    this.snackbar.open(message, '', {duration: 2000});
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.wordList.filter = filterValue;
    this.matches.filteredWordlist.next(this.wordList.filteredData);
  }

  compileWordList() {
    if (this.collection === undefined || this.collection.length === 0) {
      this.openSnackBar('First select a corpus');
    } else {
      this.wl = new WordFreqDist(this.collection, this.options);
      this.matches.run();
      this.wl.compileList(this.matches);
    }
  }

  ngAfterViewInit() {
    this.wordList.paginator = this.paginator;

    this.parameters.currentCorpusPath.subscribe(paths => this.collection = paths);
    this.parameters.currentOptions.subscribe(options => this.options = options);
    this.matches.currentWordlist.subscribe((items) => {
      this.wordList.data = items;
      this.paginator.pageIndex = 0;
      this.changes.detectChanges();
    });
  }

}

export class WordFreqDist {
  private paths: string[];
  private cp: typeof childProcess;
  private decoder: NodeStringDecoder;
  private counts = {};
  private remainder: string;
  private args = ['--no-filename', '--no-heading', '--no-line-number',
                  '--color', 'ansi', '--colors', 'path:none', '--colors',
                  'line:none', '--colors', 'match:none', '-o', '-w', '\\w+'];

  constructor(paths: string[], options: RGOptions) {
    this.cp = (<any>window).require('child_process');
    this.decoder = new StringDecoder('utf-8');
    this.paths = paths;
    const { includeGlob, excludeGlob } = options;
    if (includeGlob.length > 1) {
      this.args.push('--glob'); this.args.push(includeGlob);
    }
    if (excludeGlob.length > 1) {
      this.args.push('--glob'); this.args.push('!' + excludeGlob);
    }
  }

  compileList(service: MatchesService): void {
    const cwd = platform === 'win32' ? 'c:/' : '/';
    const process = this.cp.spawn(rgPath, this.args.concat(this.paths), { cwd });
    process.once('exit', () => {
      console.log('compiled frequency list');
      this.handleData(this.decoder.end());
      service.updateWordList(this.counts);
    });
    process.stdout.on('data', data => {
      const str = typeof data === 'string' ? data : this.decoder.write(data);
      this.handleData(str);
    });
  }

  handleData(str: string) {
    const data = this.remainder ? this.remainder + str : str;
    const words: string[] = str.split(/\r\n|\n/);
    this.remainder = words[words.length - 1] ? words.pop() : null;
    words.forEach(word => {
      this.counts[word] = this.counts[word] ? this.counts[word] + 1 : 1;
    });
  }
}
