import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpellingDataService {
  private words: { text: string, checked: boolean }[] = [];

  constructor() { }

  setWords(words: { text: string, checked: boolean }[]): void {
    this.words = words;
  }

  getWords(): { text: string, checked: boolean }[] {
    return this.words;
  }
}
