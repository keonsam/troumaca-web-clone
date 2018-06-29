import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthGuardService} from './auth.guard.service';

@Injectable()
export class UnAuthGuard implements CanActivate, CanActivateChild {

  constructor(private authGuardService: AuthGuardService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authGuardService.isLoggedIn
      .switchMap(value => {
        if (value) {
          return this.authGuardService.partyIdExist
            .map(value2 => {
              if (value2) {
                this.router.navigate(['/home/lobby']);
              }else {
                this.router.navigate(['/create-profile']);
              }
              return false;
            });
        }
        return Observable.of(true);
      });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authGuardService.isLoggedIn
      .map(value => {
        if (value) {
          this.router.navigate(['/home/lobby']);
        }
        return !value;
      });
  }

}
