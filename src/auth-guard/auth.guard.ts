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
import {SessionService} from '../session/session.service';
import {AuthService} from '../app/auth.service';
import {authRoutes} from '../app/auth.routes';
import {AUTHENTICATION, HOME, LOBBY} from '../app/routes';


export function authGuardProviderFactory (authGuardService: AuthGuardService, authService: AuthService, router: Router): AuthGuard {
  return new AuthGuard(authGuardService, authService, router);
}

@Injectable({
  providedIn: 'root',
  useFactory: authGuardProviderFactory,
  deps: [AuthGuardService, AuthService, Router]
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    protected authGuardService: AuthGuardService,
    protected authService: AuthService,
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
    return true;
    // return this.authGuardService.isValidSession()
    //   .pipe(map(validSession => {
    //     if (state.url.indexOf(`${AUTHENTICATION}`) !== -1) {
    //       if (validSession.valid) {
    //         this.router.navigate([`/${LOBBY}`]);
    //         if (!this.authService.isLoggedIn()) {
    //           this.authService.isLoginSubject.next(true);
    //         }
    //       }else if (!validSession.valid && this.authService.isLoggedIn()) {
    //         this.authService.isLoginSubject.next(false);
    //       }
    //       return !validSession.valid;
    //     }else {
    //       if (!validSession.valid) {
    //         this.router.navigate([`/${HOME}`]);
    //         if (this.authService.isLoggedIn()) {
    //           this.authService.isLoginSubject.next(false);
    //         }
    //       }else if (validSession.valid && !this.authService.isLoggedIn()) {
    //         this.authService.isLoginSubject.next(true);
    //       }
    //       return validSession.valid;
    //     }
    //   }));
  }
}
