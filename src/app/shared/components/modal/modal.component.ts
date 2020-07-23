import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    console.log(this.data);
  }

}
