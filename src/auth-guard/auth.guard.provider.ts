import {AuthGuard} from './auth.guard';
import {AuthGuardService} from './auth.guard.service';
import {Router} from '@angular/router';
import {EventService} from '../event/event.service';

export function authGuardProviderFactory (authGuardService: AuthGuardService, eventService: EventService, router: Router): AuthGuard {
  let authGuard: AuthGuard;
  if (!authGuard) {
    authGuard = new AuthGuard(authGuardService, eventService, router);
  }
  return authGuard;
}

export let authGuardProvider = {
  provide: AuthGuard,
  useFactory: authGuardProviderFactory,
  deps: [AuthGuardService, EventService, Router]
};
