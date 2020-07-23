import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss']
})
export class AvatarSelectorComponent implements OnInit {

  totalAvatars = 8;
  avatarArray = [];

  @Output() avatarSelected = new EventEmitter<any>();

  constructor() {
    this.avatarArray = Array(this.totalAvatars).fill(0).map((x, i) => i+1);
  }

  selectAvatar(id: number): void {
    this.avatarSelected.emit(id);
  }

  ngOnInit() {
  }

}
