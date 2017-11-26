import { Component, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { LineMatch } from '../searchbar/searchbar.component';
import { MatchesService } from '../matches.service';

declare var electron: any;
const fs = (<any>window).electronRemote.require('fs');

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements AfterViewInit {
  displayedColumns = ['filename', 'match'];
  dataSource = new MatTableDataSource<LineMatch>([]);
  @Output() tabEvent = new EventEmitter<{}>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private matches: MatchesService,
              private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.matches.currentMatches.subscribe((matches) => {
      this.dataSource.data = matches;
      this.paginator.pageIndex = 0;
      this.cd.detectChanges();
    });
  }

  openfile(filepath: string, filename: string, linematch: number) {
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if (err) {
        alert('An error ocurred reading the file :' + err.message);
        return;
      }
      this.tabEvent.emit({ filename: filename, content: data.split(/\r\n|\n/), no: linematch });
    });
  }
}
