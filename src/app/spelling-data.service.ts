import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpellingDataService {
  private words: string[] = [];

  constructor() { }

  setWords(words: string[]): void {
    this.words = words;
  }

  getWords(): string[] {
    return this.words;
  }
}
