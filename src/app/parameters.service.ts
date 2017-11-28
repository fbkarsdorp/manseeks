import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ParametersService {

  private query = new BehaviorSubject<string>('');
  currentQuery = this.query.asObservable();
  private corpusPath = new BehaviorSubject<string[]>([]);
  currentCorpusPath = this.corpusPath.asObservable();
  private options = new BehaviorSubject<RGOptions>(new RGOptions);
  currentOptions = this.options.asObservable();
  private export = new BehaviorSubject<ExportOptions>(new ExportOptions);
  currentExport = this.export.asObservable();

  constructor() { }

  changeQuery(query: string) {
    this.query.next(query);
  }

  changeCorpusPath(corpusPath: string) {
    const paths = this.corpusPath.value;
    paths.push(corpusPath);
    this.corpusPath.next(paths);
    console.log(this.corpusPath.value);
  }

  remove(index: number) {
    const paths = this.corpusPath.value;
    paths.splice(index, 1);
    this.corpusPath.next(paths);
    console.log(this.corpusPath.value);
  }

  updateOptions(options: RGOptions) {
    this.options.next(options);
    console.log('RG options updated', this.options.value);
  }

  updateExport(options: ExportOptions) {
    this.export.next(options);
    console.log('Export options updated', this.export.value);

  }

}

export class RGOptions {
  usecase = false;
  word = false;
  regex= true;
  context = 100;
  includeGlob = '';
  excludeGlob = '';
}

export class ExportOptions {
  fieldSeparator = ',';
  quoteStrings = '"';
  decimalseparator = '.';
  showLabels = true;
  showTitle = true;
  useBom = true;
}
