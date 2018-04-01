import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthGuardService} from "./auth.guard.service";
import {excludedRoutes} from './excluded.routes';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authGuardService: AuthGuardService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    this.authGuardService.redirectUrl = 'home';
    return this.authGuardService.isLoggedIn
      .map(value => {
        if (!value && this.validateExcludedUrls(url)) {
          return true;
        } else if (!value && !this.validateExcludedUrls(url)) {
          this.router.navigate(['home']);
          return false;
        }else if (value && this.validateExcludedUrls(url)) {
          this.router.navigate(['home/lobby']);
          return false;
        }
        return true;
      });
  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //to avoid the childRoute.url[0] error
    let url: string = state.url;
    this.authGuardService.redirectUrl = 'home';
    return this.authGuardService.isLoggedIn
      .map(value => {
        if (!value && this.validateExcludedUrls(url)) {
          return true;
        } else if (!value && !this.validateExcludedUrls(url)) {
          this.router.navigate(['home']);
          return false;
        }else if (value && this.validateExcludedUrls(url)) {
          this.router.navigate(['home/lobby']);
          return false;
        }
        return true;
      });
  }

  validateExcludedUrls(url) {
    //this may not be maintainable
    let testRegex = /\/[a-z-]*\/[a-z-]*\/[a-z-]*/gi; // test the string not a pro
    let matchRegex = /\/[a-z-]*\/[a-z-]*\//gi; // not good with regex if you can fix this that will be great
    if(testRegex.test(url)) {
      url = url.match(matchRegex)[0].slice(0, -1);
    }
    if (excludedRoutes.indexOf(url) !== -1) {
      return true;
    }else {
      return false;
    }
  }

}
