import { Component, OnInit } from '@angular/core';
import { AppService } from "../../../core/services/app.service";

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit {

  constructor(private appService: AppService) { }

  easy = [];
  medium = [];
  hard = [];

  maxLenArray = 0;
  arr = [1];

  handleScores(scoresObj) {
    let { Easy, Medium, Hard } = scoresObj;
    console.log(Easy, Medium, Hard);

    this.easy = Easy;
    this.medium = Medium;
    this.hard = Hard;

    this.easy.sort(function (a, b) { return b - a });
    this.medium.sort(function (a, b) { return b - a });
    this.hard.sort(function (a, b) { return b - a });

    this.maxLenArray = Math.max(Easy.length, Medium.length, Hard.length);
    
    this.arr = Array(this.maxLenArray).fill(0).map((x, i) => i);
  }

  

  ngOnInit() {
    this.appService.$updateScoreObservable.subscribe(scoresObj => {
      this.handleScores(scoresObj);
    })
  }

}
