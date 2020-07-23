import { Component, OnInit } from '@angular/core';
import { UserInfo } from "../../../shared/model/UserInfo.model";
import { AppService } from "../../../core/services/app.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormData: UserInfo = {
    'username': '',
    'password': ''
  };

  constructor(public appService: AppService, private router: Router) { }


  login() {
    if(this.loginFormData.username == 'admin' && this.loginFormData.password == 'admin') {
      this.appService.setIsUserLoggedIn(true);
      this.appService.navigateByUrl('/home');

      let message = {
        heading: 'You are now logged in',
        messageType: 'success'
      }

      this.appService.showBannerMessage(message);
    } else {
      let message = {
        heading: 'Incorrect username/password',
        messageType: 'error'
      }

      this.appService.showBannerMessage(message);
    }
  }

  ngOnInit() {
  }

}
