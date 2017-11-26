import { Component, AfterViewInit, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-docpage',
  templateUrl: './docpage.component.html',
  styleUrls: ['./docpage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DocpageComponent implements AfterViewInit {

  @Input() content;
  @Input() linematch;
  el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const match = this.el.getElementsByClassName('doclinematch');
      match[0].scrollIntoView(false);
    }, 200);
  }

}

