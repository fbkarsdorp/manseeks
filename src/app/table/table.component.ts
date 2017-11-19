import { Component, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { LineMatch } from '../searchbar/searchbar.component';
import { MatchesService } from '../matches.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements AfterViewInit {
  displayedColumns = ['filename', 'match'];
  dataSource = new MatTableDataSource<LineMatch>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private matches: MatchesService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.matches.currentMatches.subscribe((matches) => {
      this.dataSource.data = matches;
      this.paginator.pageIndex = 0;
      this.changeDetectorRefs.detectChanges();
    });
  }

}


