import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {

  @Input() tileInfo;
  @Output() revealTile = new EventEmitter<any>();

  constructor() { }

  revealTileFn(): void {
    //console.log('clicked', this.tileInfo.yIndex);
    if(!this.tileInfo.clicked) {
      this.revealTile.emit({
        y: this.tileInfo.yIndex,
        x: this.tileInfo.xIndex
      });
    }
  }

  ngOnInit() {
  }

}
