import { Component } from '@angular/core'
import { SpellingDataService } from '../spelling-data.service'
import { Router, ActivatedRoute  } from '@angular/router';
import { WordListComponent } from './word-list/word-list.component';

@Component({
  selector: 'app-spelling',
  templateUrl: './spelling.component.html',
  styleUrls: ['./spelling.component.scss']
})
export class SpellingComponent {
  showWordAddition: boolean = false
  spellingWords: string = ''
  savedWords: { text: string, checked: boolean }[] = [];

  constructor (private router: Router, private route: ActivatedRoute, private spellingDataService: SpellingDataService) {}

  toggleWordAddition () {
    this.showWordAddition = !this.showWordAddition
  }

  saveWords() {
    const words = this.spellingWords.split('\n')
    if (words.length <= 25) {
      this.savedWords = words.map(word => ({ text: word, checked: false }));
      this.spellingDataService.setWords(this.savedWords);
      this.showWordAddition = false;
    } else {
      alert('Please enter a maximum of 25 words.');
    }
  }

  handleInput (event: Event) {
    const target = event.target as HTMLTextAreaElement
    this.spellingWords = target.value
  }

  navigateToGame(game: string) {
    this.router.navigate([game], { relativeTo: this.route });
  }
}
