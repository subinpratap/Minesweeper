import { Component } from '@angular/core';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { AppService } from "./core/services/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nutanix';

  constructor(private router: Router, private appService: AppService) {

    router.events.subscribe((event: RouterEvent): void => {
      if(event instanceof RouteConfigLoadStart) {
        this.appService.showLoader();
      } else if(event instanceof RouteConfigLoadEnd) {
        this.appService.hideLoader();
      }
    })

  }
}
