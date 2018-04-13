import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthGuardService} from "./auth.guard.service";
import {excludedRoutes} from './excluded.routes';
import {EventService} from "../event/event.service";
import {Event} from "../authentication/event";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authGuardService: AuthGuardService,
              private eventService: EventService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    this.authGuardService.redirectUrl = '/home';
    return this.authGuardService.isLoggedIn
      .map(value => {
        if (!value && this.validateExcludedUrls(url)) {
          return true;
        } else if (!value && !this.validateExcludedUrls(url)) {
          this.eventService.sendSessionExpiredEvent(this.createEventModel());
          return false;
        }else if (value && this.validateExcludedUrls(url)) {
          this.router.navigate(['/home/lobby']);
          return false;
        }
        return true;
      });
  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
    // backend has a method that check the child routes
    /*let url: string = state.url;
    this.authGuardService.redirectUrl = '/home';
    return this.authGuardService.isLoggedIn
      .map(value => {
        if (!value && this.validateExcludedUrls(url)) {
          return true;
        } else if (!value && !this.validateExcludedUrls(url)) {
          this.router.navigate(['/home']);
          return false;
        }else if (value && this.validateExcludedUrls(url)) {
          this.router.navigate(['/home/lobby']);
          return false;
        }
        return true;
      });*/
  }

  validateExcludedUrls(url) {
    //this may not be maintainable
    let matchRegex = /\/[a-z-]*\/[a-z-]*\//gi; // not good with regex if you can fix this, that will be great
    if(url.indexOf('phone-verification') !== -1 || url.indexOf('email-verification') !== -1 ) {
      url = url.match(matchRegex)[0].slice(0, -1);
    }
    if (excludedRoutes.indexOf(url) !== -1) {
      return true;
    }else {
      return false;
    }
  };

  createEventModel() {
    let event:Event = new Event();
    event.partyId = "123";
    event.timestamp = new Date().getTime();
    event.source = "AuthGuard.component";
    event.name = "AuthGuard";

    return event;
  }

}
