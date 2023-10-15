import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent {
  @Input() words: { text: string, checked: boolean }[] = [];


  toggleWordChecked(word: { text: string, checked: boolean }) {
    word.checked = !word.checked;
}

  clearAll() {
    this.words.forEach(word => word.checked = false);
  }
}
