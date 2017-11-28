import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { ParametersService } from '../parameters.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  max = 500;
  min = 50;
  thumbLabel = true;
  step = 1;

  rgOptions = { usecase: false, word: false, regex: true, context: 100, includeGlob: '', excludeGlob: ''};
  export = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    useBom: true
  };

  constructor(private parameters: ParametersService) {
  }

  ngOnInit() {
  }

  updateRGOptions() {
    this.parameters.updateOptions(this.rgOptions);
  }

  changeExport() {
    this.parameters.updateExport(this.export);
  }

  // changeExport(event: )
}
