import { Component, OnInit } from '@angular/core';
import { AppService } from "../../../core/services/app.service";

@Component({
  selector: 'app-generic-message',
  templateUrl: './generic-message.component.html',
  styleUrls: ['./generic-message.component.scss']
})
export class GenericMessageComponent implements OnInit {

  message: object;
  timerId;
  constructor(private appService: AppService) { }

  hideBannerMessage(): void {
    this.message = { heading: '' }
  }

  showBannerMessage(message): void {
    this.message = message;
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => { this.hideBannerMessage() }, 2000)
  }
 
  ngOnInit() {
    this.appService.$bannerMessageObservable.subscribe(message => this.showBannerMessage(message))
  }

}
