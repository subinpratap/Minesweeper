import { Component, OnInit } from '@angular/core';
import { AppService } from "../../services/app.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  showLoader: boolean = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.$loadingIndicatorObservable.subscribe(showLoader => this.showLoader = showLoader);
  }

}
