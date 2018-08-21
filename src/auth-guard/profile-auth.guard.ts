import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthGuardService} from './auth.guard.service';
import {map, switchMap} from "rxjs/operators";

@Injectable()
export class ProfileAuthGuard implements CanActivate, CanActivateChild {

  constructor(private authGuardService: AuthGuardService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authGuardService.isLoggedIn
      .pipe(switchMap(value => {
        if (value) {
          return this.authGuardService.partyIdExist
            .pipe(map(value2 => {
              if (value2) {
                this.router.navigate(['/home/lobby']);
              }
              return !value2;
            }));
        }
        this.router.navigate(['/home']);
        of(value);
      }));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

}
