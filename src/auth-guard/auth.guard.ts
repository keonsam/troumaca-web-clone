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
    console.log(url);
    let newUrl = this.router.parseUrl(url);
    console.log(newUrl)
    return true
    /*if (excludedRoutes.indexOf(newUrl) !== -1) {
      return true;
    }else {
      return false;
    }*/
  }

}
