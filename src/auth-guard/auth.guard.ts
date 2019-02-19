import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  CanActivateChild,
} from '@angular/router';
import { AuthGuardService} from './auth.guard.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import {authRoutes} from '../app/auth.routes';
import {SessionService} from '../session/session.service';


export function authGuardProviderFactory (authGuardService: AuthGuardService, sessionService: SessionService, router: Router): AuthGuard {
  return new AuthGuard(authGuardService, sessionService, router);
}

@Injectable({
  providedIn: 'root',
  useFactory: authGuardProviderFactory,
  deps: [AuthGuardService, SessionService, Router]
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    protected authService: AuthGuardService,
    protected sessionService: SessionService,
    protected router: Router,
  ) { }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(route, state)
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(childRoute, state)
  }

  protected checkLogin(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) {
    return this.authService.isValidSession()
      .pipe( map(validSession => {
        if (!this.sessionService.loginEvent.value && validSession.valid) {
          this.sessionService.loginEvent.next(true);
        }
        if (!route) {
          if (!validSession.valid) {
            this.sessionService.logoutEvent.next(true);
            // this.router.navigate(['/home']);
          }
          return validSession.valid;
        } else if (authRoutes.indexOf(this.calURL(state.url)) > -1) {
          if (validSession.valid) {
            this.router.navigate(['/lobby']);
          }
          return !validSession.valid;
        } else {
          if (!validSession.valid) {
            this.sessionService.logoutEvent.next(true);
            // this.router.navigate(['/home']);
          }
          return validSession.valid;
        }
      }));
  }

  private calURL(url) {
    const matchRegex = /\/[a-z-]*\/[a-z-]*\//gi;
    if (url.indexOf('confirmations') !== -1) {
      return url.match(matchRegex)[0].slice(0, -1);
    }
    return url;
  }
}
