import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  CanActivateChild,
} from '@angular/router';
// import { AuthGuardService} from './auth.guard.service';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
// import {SessionService} from '../session/session.service';
// import {AuthService} from '../app/auth.service';
// import {authRoutes} from '../app/auth.routes';
// import {AUTHENTICATION, HOME, DASHBOARD} from '../app/routes';


export function authGuardProviderFactory (router: Router): AuthGuard {
  return new AuthGuard(router);
}

@Injectable({
  providedIn: 'root',
  useFactory: authGuardProviderFactory,
  deps: [Router]
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
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
    //         this.router.navigate([`/${DASHBOARD}`]);
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
