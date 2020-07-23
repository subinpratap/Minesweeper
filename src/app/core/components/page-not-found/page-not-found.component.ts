import { Component, OnInit } from '@angular/core';
import { AppService } from "../../services/app.service";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private appService: AppService) { }

  navigateToHome() {
    this.appService.navigateByUrl('/home');
  }

  ngOnInit() {
  }

}
