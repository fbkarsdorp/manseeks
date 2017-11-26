import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ParametersService } from '../parameters.service';

@Component({
  selector: 'app-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['./statusbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatusbarComponent implements OnInit {
  basepaths: string[];
  paths: string[];
  selected = true;
  removable = true;

  constructor(private parameters: ParametersService) {
    this.basepaths = [];
   }

  ngOnInit() {
    this.parameters.currentCorpusPath.subscribe(
      paths => {
        this.paths = paths;
        this.basepaths = [];
        paths.forEach(path => this.basepaths.push(path.split('/').splice(-1)[0]));
      }
    );
  }

  remove(path: string): void {
    const index = this.basepaths.indexOf(path);
    if (index >= 0) {
      this.parameters.remove(index);
      console.log("CHIPS", this.basepaths);
    }
  }

}
