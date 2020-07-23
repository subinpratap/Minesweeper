import { Injectable } from '@angular/core';
import { AppService } from "../../../core/services/app.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private appService: AppService) {}

  saveScore(scoresArray): void {
    this.appService.saveScore(scoresArray);
  }

}
