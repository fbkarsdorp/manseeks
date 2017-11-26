import { Component, Input, NgZone, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ManSeeks';
  tabIndex = 0;
  tabs = [];

  constructor(private zone: NgZone) {
  }

  tabChanged (tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    this.tabIndex = tabChangeEvent.index;
  }

  removeTab(tab) {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
    this.tabIndex = 0;
  }

  tabMessage($event) {
    this.zone.run(() => {
      const tabs = this.tabs.slice(0);
      tabs.push({label: $event.filename, content: $event.content, number: $event.no });
      this.tabs = tabs;
      this.tabIndex = this.tabs.length + 1;
    });
  }
}
