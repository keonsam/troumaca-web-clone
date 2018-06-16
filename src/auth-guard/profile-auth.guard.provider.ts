import {AuthGuardService} from './auth.guard.service';
import {Router} from "@angular/router";
import {ProfileAuthGuard} from './profile-auth.guard';

export function profileAuthGuardProviderFactory (authGuardService: AuthGuardService,  router: Router): ProfileAuthGuard {
  let profileAuthGuard: ProfileAuthGuard;
  if (!profileAuthGuard) {
    profileAuthGuard = new ProfileAuthGuard(authGuardService, router);
  }
  return profileAuthGuard;
}

export let profileAuthGuardProvider = {
  provide: ProfileAuthGuard,
  useFactory: profileAuthGuardProviderFactory,
  deps: [AuthGuardService, Router]
};
