import { Component, OnInit } from '@angular/core';
import { SpellingDataService } from '../../spelling-data.service';

interface GridCell {
  letter: string;
  selected: boolean;
  correct?: boolean;
  incorrect?: boolean;
}

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.scss'],
})
export class WordSearchComponent implements OnInit {
  grid: GridCell[][] = [];
  gridSize: number = 15;
  words: { text: string; checked: boolean }[] = [];
  horizontalWords: { text: string; checked: boolean }[] = [];
  verticalWords: { text: string; checked: boolean }[] = [];
  startPoint: { row: number; col: number } | null = null;

  constructor(private spellingDataService: SpellingDataService) {}

  ngOnInit(): void {
    this.words = this.spellingDataService.getWords();
    this.horizontalWords = this.words.slice(0, this.words.length / 2);
    this.verticalWords = this.words.slice(this.words.length / 2);
    this.generateGrid();
  }


  generateGrid (): void {
    for (let i = 0; i < this.gridSize; i++) {
      this.grid[i] = []
      for (let j = 0; j < this.gridSize; j++) {
        this.grid[i][j] = {
          letter: '',
          selected: false
        }
      }
    }

    this.populateWords(this.horizontalWords, 'horizontal')
    this.populateWords(this.verticalWords, 'vertical')

    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        if (!this.grid[i][j].letter) {
          this.grid[i][j].letter = this.randomLetter()
        }
      }
    }
  }

  populateWords(words: { text: string; checked: boolean }[], orientation: 'horizontal' | 'vertical'): void {
    words.forEach(wordObj => {
      let word = wordObj.text;
      let attempts = 3 // number of attempts to fit a word without collision
      while (attempts-- > 0) {
        let row, col
        let canPlace = true
        if (orientation === 'horizontal') {
          row = Math.floor(Math.random() * this.gridSize)
          col = Math.floor(Math.random() * (this.gridSize - word.length))
          for (let i = 0; i < word.length; i++) {
            if (this.grid[row][col + i].letter) {
              canPlace = false
              break
            }
          }
          if (canPlace) {
            for (let i = 0; i < word.length; i++) {
              this.grid[row][col + i].letter = word[i].toUpperCase()
            }
            break // break out of while loop if word placed successfully
          }
        } else {
          col = Math.floor(Math.random() * this.gridSize)
          row = Math.floor(Math.random() * (this.gridSize - word.length))
          for (let i = 0; i < word.length; i++) {
            if (this.grid[row + i][col].letter) {
              canPlace = false
              break
            }
          }
          if (canPlace) {
            for (let i = 0; i < word.length; i++) {
              this.grid[row + i][col].letter = word[i].toUpperCase()
            }
            break // break out of while loop if word placed successfully
          }
        }
      }
    })
  }

  randomLetter (): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  }

  selectCell (row: number, col: number): void {
    if (!this.startPoint) {
      this.grid[row][col].selected = true
      this.startPoint = { row, col }
    } else {
      this.highlightSelectedCells(row, col)
      this.checkSelectedCells()
      this.startPoint = null
    }
  }

  highlightSelectedCells (row: number, col: number): void {
    if (this.startPoint) {
      let { row: startRow, col: startCol } = this.startPoint

      let start = startRow < row ? this.startPoint : { row, col }
      let end = startRow < row ? { row, col } : this.startPoint

      if (start.row === end.row) {
        // Horizontal line
        for (
          let i = Math.min(start.col, end.col);
          i <= Math.max(start.col, end.col);
          i++
        ) {
          this.grid[start.row][i].selected = true
        }
      } else if (start.col === end.col) {
        // Vertical line
        for (
          let i = Math.min(start.row, end.row);
          i <= Math.max(start.row, end.row);
          i++
        ) {
          this.grid[i][start.col].selected = true
        }
      }
    }
  }

  checkSelectedCells(): void {
    const selectedCells = this.grid.flatMap((r) => r.filter((c) => c.selected));
    const selectedWord = selectedCells.map((c) => c.letter).join('').toLowerCase();

    console.log(`Selected letters: ${selectedWord}`);

    if (this.words.some(wordObj => wordObj.text.toLowerCase() === selectedWord)) {
      this.grid.forEach(row =>
        row.forEach(cell => {
          if (cell.selected) {
            cell.correct = true
            cell.selected = false
          }
        })
      )
    } else {
      this.grid.forEach(row =>
        row.forEach(cell => {
          if (cell.selected) {
            cell.incorrect = true
            cell.selected = false
          }
        })
      )
      setTimeout(() => {
        this.grid.forEach(row =>
          row.forEach(cell => {
            if (cell.incorrect) {
              cell.incorrect = false
            }
          })
        )
      }, 4000)
    }
  }
}
