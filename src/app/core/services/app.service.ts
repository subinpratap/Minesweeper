import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { BannerMessage } from "../../shared/model/bannerMessage.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _userLoggedIn: boolean = false;
  
  private bannerMessage = new Subject<any>();
  $bannerMessageObservable: Observable<any> = this.bannerMessage.asObservable();

  private loadingIndicator = new Subject<any>();
  $loadingIndicatorObservable: Observable<any> = this.loadingIndicator.asObservable();

  private updateScore = new Subject<any>();
  $updateScoreObservable: Observable<any> = this.updateScore.asObservable();

  constructor(private router: Router) {
    console.log("App Service Instanciated");
  }

  getIsUserLoggedIn(): boolean {
    return this._userLoggedIn;
  }

  setIsUserLoggedIn(status: boolean) {
    this._userLoggedIn = status;
  }

  navigateByUrl(url: string): void {
    this.router.navigate([url]);
  }

  showBannerMessage(message: BannerMessage): void {
    this.bannerMessage.next(message);
  }

  hideBannerMessage(): void {
    this.bannerMessage.next({ heading: '' });
  }

  showLoader(): void {
    this.loadingIndicator.next(true);
  }

  hideLoader(): void {
    this.loadingIndicator.next(false);
  }

  saveScore(scoresArray): void {
    this.updateScore.next(scoresArray);
  }
}
