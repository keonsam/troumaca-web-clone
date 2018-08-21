import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthGuardService} from './auth.guard.service';
import { map} from "rxjs/operators";

@Injectable()
export class UnAuthGuard implements CanActivate, CanActivateChild {

  constructor(private authGuardService: AuthGuardService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authGuardService.isLoggedIn
      .pipe(map(value => {
        if (value) {
          this.router.navigate(['/home/lobby']);
        }
        return !value;
      }));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authGuardService.isLoggedIn
      .pipe(map(value => {
        if (value) {
          this.router.navigate(['/home/lobby']);
        }
        return !value;
      }));
  }

}
