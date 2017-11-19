import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ParametersService, ExportOptions } from '../parameters.service';
import { MatchesService } from '../matches.service';
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
  selected = true;
  removable = true;
  corpuspath: string[];
  basepath: string[];
  results: LineMatch[];
  exportOptions: ExportOptions;

  constructor(private parameters: ParametersService, private table: MatchesService) {
    this.basepath = [];
  }

  getCorpusPath(): void {
    const selection = electron.dialog.showOpenDialog(
      { properties: ['openDirectory', 'multiSelections'] });
    if (selection) {
      this.parameters.changeCorpusPath(selection[0]);
      this.basepath.push(selection[0].split('/').slice(-1)[0]);
    }
  }

  openWriteDialog(): void {
    console.log(this.exportOptions);
    const csvtable = CSV(
      {
        data: this.results,
        fields: ['origin', 'lineNumber', 'lhs', 'match', 'rhs'],
        quotes: this.exportOptions.quoteStrings,
        hasCSVColumnTitle: this.exportOptions.showLabels,
        del: this.exportOptions.fieldSeparator
      });
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

  remove(path: string): void {
    const index = this.basepath.indexOf(path);
    if (index >= 0) {
      this.parameters.remove(index);
      this.basepath.splice(index, 1);
    }
  }

  ngOnInit() {
    this.parameters.currentCorpusPath.subscribe(corpuspath => this.corpuspath = corpuspath);
    this.parameters.currentExport.subscribe(options => this.exportOptions = options);
    this.table.currentMatches.subscribe(results => this.results = results);
  }

}
