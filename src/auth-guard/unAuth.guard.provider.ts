import {UnAuthGuard} from './unAuth.guard';
import {AuthGuardService} from './auth.guard.service';
import {Router} from '@angular/router';

export function unAuthGuardProviderFactory (authGuardService: AuthGuardService,  router: Router): UnAuthGuard {
  let unAuthGuard: UnAuthGuard;
  if (!unAuthGuard) {
    unAuthGuard = new UnAuthGuard(authGuardService, router);
  }
  return unAuthGuard;
}

export let unAuthGuardProvider = {
  provide: UnAuthGuard,
  useFactory: unAuthGuardProviderFactory,
  deps: [AuthGuardService, Router]
};
