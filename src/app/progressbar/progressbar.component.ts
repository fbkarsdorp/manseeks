import { Component, Input, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { MatchesService } from '../matches.service';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressbarComponent implements OnInit {

  @Input() active: boolean;
  constructor(private matches: MatchesService,
              private refs: ChangeDetectorRef) { }

  ngOnInit() {
    this.matches.currentlyRunning.subscribe(data => {
      this.active = data;
      this.refs.detectChanges();
    });
  }

}
