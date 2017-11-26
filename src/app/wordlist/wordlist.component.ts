import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ParametersService } from '../parameters.service';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { StringDecoder, NodeStringDecoder } from 'string_decoder';
import { MatchesService, Word } from '../matches.service';

const childProcess = (<any>window).require('child_process');
const { rgPath } = (<any>window).require('vscode-ripgrep');
const { platform } = (<any>window).require('process');

@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WordlistComponent implements AfterViewInit {
  collection: string[];
  displayedColumns = ['word', 'frequency'];
  wordList = new MatTableDataSource<Word>([]);
  wl: WordFreqDist;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
  }

  compileWordList() {
    if (this.collection === undefined || this.collection.length === 0) {
      this.openSnackBar('First select a corpus');
    } else {
      this.wl = new WordFreqDist(this.collection);
      this.matches.run();
      this.wl.compileList(this.matches);
    }
  }

  ngAfterViewInit() {
    this.wordList.paginator = this.paginator;
    this.wordList.sort = this.sort;

    this.parameters.currentCorpusPath.subscribe(paths => this.collection = paths);
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

  constructor(paths: string[]) {
    this.cp = (<any>window).require('child_process');
    this.decoder = new StringDecoder('utf-8');
    this.paths = paths;
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
