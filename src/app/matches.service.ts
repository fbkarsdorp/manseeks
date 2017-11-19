import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatTableDataSource } from '@angular/material';
import { LineMatch } from './searchbar/searchbar.component';

@Injectable()
export class MatchesService {
  matches = new BehaviorSubject<LineMatch[]>([]);
  currentMatches = this.matches.asObservable();

  running = new BehaviorSubject<boolean>(false);
  currentlyRunning = this.running.asObservable();

  constructor() { }

  updateMatches(matches: LineMatch[]) {
    this.matches.next(matches);
  }

  run() {
    this.running.next(true);
  }

  stop() {
    this.running.next(false);
  }

}
