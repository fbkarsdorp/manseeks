import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ParametersService, ExportOptions } from '../parameters.service';
import { MatchesService, Word } from '../matches.service';
import { LineMatch } from '../searchbar/searchbar.component';
import * as CSV from 'json2csv';

declare var electron: any;
const fs = (<any>window).electronRemote.require('fs');

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() sidenav: any;
  @Input() tabIndex: number;
  corpuspath: string[];
  results: LineMatch[];
  wordlist: Word[];
  concordanceHeader = ['origin', 'lineNumber', 'lhs', 'match', 'rhs'];
  wordlistHeader = ['word', 'frequency'];
  exportOptions: ExportOptions;

  constructor(private parameters: ParametersService, private table: MatchesService) { }

  getCorpusPath(): void {
    const selection = electron.dialog.showOpenDialog(
      { properties: ['openDirectory', 'multiSelections'] });
    if (selection) {
      this.parameters.changeCorpusPath(selection[0]);
    }
  }

  openWriteDialog(): void {
    let csvtable;
    if (this.tabIndex === 0) {
      csvtable = CSV(
        {
          data: this.results,
          fields: this.concordanceHeader,
          quotes: this.exportOptions.quoteStrings,
          hasCSVColumnTitle: this.exportOptions.showLabels,
          del: this.exportOptions.fieldSeparator
        });
      } else if (this.tabIndex === 1) {
        csvtable = CSV(
          {
            data: this.wordlist,
            fields: this.wordlistHeader,
            quotes: this.exportOptions.quoteStrings,
            hasCSVColumnTitle: this.exportOptions.showLabels,
            del: this.exportOptions.fieldSeparator
          });
      } else {
        return;
      }
    electron.dialog.showSaveDialog((filename) => {
      if (filename === undefined) {
        console.log('File not saved.');
        return;
      }
      fs.writeFile(filename, csvtable, (err) => {
        if (err) {
          alert('An error ocurred creating the file ' + err.message);
        }
      });
    });
  }

  ngOnInit() {
    this.parameters.currentCorpusPath.subscribe(corpuspath => this.corpuspath = corpuspath);
    this.parameters.currentExport.subscribe(options => this.exportOptions = options);
    this.table.currentMatches.subscribe(results => this.results = results);
    this.table.currentWordlist.subscribe(words => this.wordlist = words);
  }

}
