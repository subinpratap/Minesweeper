import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from "../../../../shared/components/modal/modal.component";
import { HomeService } from "../home.service";

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

  showGame: boolean = false;
  avatarId: number;
  width: number = 8;
  height: number = 9;
  numberofBombs: number = 10;
  levels: String[] = ['Easy', 'Medium', 'Hard'];
  selectedLevel = 'Easy';
  mineSweeperArray = [];
  bombsLocation = [];
  surroundingTiles = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];
  score: number = 0;
  requiredWinningScore: number;

  allScores = {
    Easy: [],
    Medium: [],
    Hard: []
  }

  modalDialogRef: MatDialogRef<ModalComponent>;
  hasTimerStarted: boolean = false;
  timeValue: number = 0;
  interval;


  constructor(public dialog: MatDialog, public homeService:HomeService) {
    this.constructMineSweeperArray();
    this.placeRandomizedBombsInArray();
  }

  showGameFn(id: number) {
    this.showGame = true;
    this.avatarId = id;
  }

  changeDifficulty(): void {
    if(this.selectedLevel == 'Easy') {
      this.width = 8;
      this.height = 9;
      this.numberofBombs = 10;
    } else if (this.selectedLevel == 'Medium') {
      this.width = 13;
      this.height = 15;
      this.numberofBombs = 40;
    } else if (this.selectedLevel == 'Hard') {
      this.width = 30;
      this.height = 16;
      this.numberofBombs = 99;
    }

    this.reset();
  }

  constructMineSweeperArray(): void {
    this.mineSweeperArray = [];
    this.requiredWinningScore = (this.height*this.width) - this.numberofBombs;

    for (let j = 0; j < this.height; j++) {
      const col = [];

      for (let i = 0; i < this.width; i++) {
        col.push({
          yIndex: j,
          xIndex: i,
          value: '',
          clicked: false,
          hasBomb: false,
          hasBombExploded: false
        });
      }

      this.mineSweeperArray.push(col);
    }

    //console.log(this.mineSweeperArray);
  }

  placeRandomizedBombsInArray(): void {
    let bombCount = 0;
    this.bombsLocation = [];

    while(bombCount < this.numberofBombs) {
      let x = this.getRandomInRange(0, this.width);
      let y = this.getRandomInRange(0, this.height);
      //console.log(x, y)
      if (!(this.mineSweeperArray[y][x] && this.mineSweeperArray[y][x].hasBomb)) {
        this.bombsLocation.push([y, x]);
        this.mineSweeperArray[y][x].hasBomb = true;
        bombCount++;
      }
    }
  }

  getRandomInRange(min: number, max:number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  revealTile(location): void {
    //console.log(location);

    if(!this.hasTimerStarted) {
      this.startTimer();
    }

    let { x, y } = location;
    if (this.mineSweeperArray[y][x]['hasBomb']) {
      console.log('Game Over');
      this.mineSweeperArray[y][x]['clicked'] = true;
      this.revealAllBombs();
      this.stopTimer();
      this.openDialog();
    } else {
      this.score = this.score + 1;
      if (this.score == this.requiredWinningScore) {
        this.openDialog(true);
      }
      this.mineSweeperArray[y][x]['clicked'] = true;
      this.mineSweeperArray[y][x]['value'] = (this.getBombsInSurroundingTiles(y, x) > 0) ? this.getBombsInSurroundingTiles(y, x): '';
      if (this.mineSweeperArray[y][x]['value'] == '') {
        this.processNeighbouringTiles(y,x);
      }
    }  
  }

  getBombsInSurroundingTiles(y:number, x:number): number {
    let surroundingBombs = 0;

    for (let i = 0; i < this.surroundingTiles.length; i++) {
      let yShift = this.surroundingTiles[i][0];
      let xShift = this.surroundingTiles[i][1];

      if (this.mineSweeperArray[y + yShift] && this.mineSweeperArray[y + yShift][x + xShift] && this.mineSweeperArray[y + yShift][x + xShift].hasBomb) {
        surroundingBombs++;
      }
    }

    return surroundingBombs;
  }

  processNeighbouringTiles(y: number, x:number): void {
    console.log('process Neighbouring');
    for (let i = 0; i < this.surroundingTiles.length; i++) {
      let yShift = this.surroundingTiles[i][0];
      let xShift = this.surroundingTiles[i][1];

      if (this.mineSweeperArray[y + yShift] && this.mineSweeperArray[y + yShift][x + xShift] && !this.mineSweeperArray[y + yShift][x + xShift]['clicked']) {
        this.revealNeighbouringTiles((y + yShift), (x + xShift));
      }
    }
  }

  revealNeighbouringTiles(y: number, x:number): void {
    let surroundingBombs = 0;

    for (let i = 0; i < this.surroundingTiles.length; i++) {
      let yShift = this.surroundingTiles[i][0];
      let xShift = this.surroundingTiles[i][1];

      if (this.mineSweeperArray[y + yShift] && this.mineSweeperArray[y + yShift][x + xShift] && this.mineSweeperArray[y + yShift][x + xShift].hasBomb) {
        surroundingBombs++;
      }
    }

    this.mineSweeperArray[y][x]['clicked'] = true;

    if(surroundingBombs > 0) {
      this.mineSweeperArray[y][x]['value'] = surroundingBombs;
    } else {
      this.mineSweeperArray[y][x]['value'] = '';
      this.processNeighbouringTiles(y, x);
    }

    this.score++;
  }

  revealAllBombs(): void {
    
    for (let i = 0; i < this.bombsLocation.length; i++) {
      let y = this.bombsLocation[i][0];
      let x = this.bombsLocation[i][1];
      
      this.mineSweeperArray[y][x]['clicked'] = true;
    }
  }

  reset(): void {
    this.constructMineSweeperArray();
    this.placeRandomizedBombsInArray();
    this.stopTimer();
    this.timeValue = 0;
    this.hasTimerStarted = false;
    this.score = 0;
  }

  openDialog(won?: boolean): void {
    let data = {
      'heading': 'Oops....',
      'description': `You score was ${this.score}. Play Again?`
    }

    if(won) {
      data = {
        'heading': 'Yay..!!',
        'description': `You won. Want to play again?`
      }
    }

    if(this.score > 0) {
      this.allScores[this.selectedLevel].push(this.score);
      this.homeService.saveScore(this.allScores);
    }

    this.modalDialogRef = this.dialog.open(ModalComponent, {
      hasBackdrop: true,
      data: data
    });

    this.modalDialogRef.afterClosed().pipe().subscribe(() => {
      this.reset();
    });
  }

  startTimer(): void {
    this.hasTimerStarted = true;
  
    this.interval = setInterval(() => {
      this.timeValue++;
    }, 1000)  
  }

  stopTimer(): void {
    clearInterval(this.interval);
  }

  ngOnInit() {
  }

}
