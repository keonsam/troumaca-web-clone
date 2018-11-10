import {AuthGuard} from './auth.guard';
import {AuthGuardService} from './auth.guard.service';
import {Router} from '@angular/router';
import {SessionService} from "../session/session.service";

export function authGuardProviderFactory (authGuardService: AuthGuardService, sessionService: SessionService, router: Router): AuthGuard {
  let authGuard: AuthGuard;
  if (!authGuard) {
    authGuard = new AuthGuard(authGuardService, sessionService, router);

  }
  return authGuard;
}

export let authGuardProvider = {
  provide: AuthGuard,
  useFactory: authGuardProviderFactory,
  deps: [AuthGuardService, SessionService, Router]
};
