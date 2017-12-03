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

  wordlist = new BehaviorSubject<Word[]>([]);
  currentWordlist = this.wordlist.asObservable();

  filteredWordlist = new BehaviorSubject<Word[]>([]);
  currentFilteredWordList = this.filteredWordlist.asObservable();

  constructor() { }

  updateMatches(matches: LineMatch[]) {
    this.matches.next(matches);
  }

  updateWordList(counts: {}) {
    this.wordlist.next(Object.keys(counts)
      .map(word => {
        return new Word(word, counts[word]);
      })
      .sort((a, b) => b.frequency - a.frequency)
    );
    this.stop();
  }

  run() {
    this.running.next(true);
  }

  stop() {
    this.running.next(false);
  }
}

export class Word {
  word: string;
  frequency: number;

  constructor(word: string, frequency: number) {
    this.word = word;
    this.frequency = frequency;
  }
}
