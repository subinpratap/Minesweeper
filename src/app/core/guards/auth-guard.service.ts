import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from "../services/app.service";

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate {
    
    constructor(private router: Router, private appService: AppService) {
    }

    canLoad(route: Route): boolean {
        //console.log('canLoad');
        let isUserLoggedIn = this.appService.getIsUserLoggedIn();
        //console.log(route);
        //console.log(isUserLoggedIn);

        if(route.path == 'home') {
            if (isUserLoggedIn) {
                return true
            } else {
                this.appService.navigateByUrl('/auth/login');
            }
        }

        if(route.path == 'auth') {
            if (isUserLoggedIn) {
                return false
            } else {
                return true
            }
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let isUserLoggedIn = this.appService.getIsUserLoggedIn();

        if (route.url[0].path == 'auth') {
            if (isUserLoggedIn) {
                return false
            } else {
                return true
            }
        }
    }
    
}