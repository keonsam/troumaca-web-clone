import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthGuardService} from './auth.guard.service';
import {EventService} from '../event/event.service';
import {Event} from '../authentication/event';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authGuardService: AuthGuardService,
              private eventService: EventService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authGuardService.isLoggedIn
      .map(value => {
        if (!value) {
          this.eventService.sendSessionExpiredEvent(this.createEventModel());
        }
        return value;
      });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authGuardService.isLoggedIn
      .map(value => {
        if (!value) {
          this.eventService.sendSessionExpiredEvent(this.createEventModel());
        }
        return value;
      });
  }

  createEventModel() {
    const event: Event = new Event();
    event.partyId = '123';
    event.timestamp = new Date().getTime();
    event.source = 'AuthGuard.component';
    event.name = 'AuthGuard';

    return event;
  }

}
