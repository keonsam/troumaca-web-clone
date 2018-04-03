import {AuthGuard} from "./auth.guard";
import {AuthGuardService} from "./auth.guard.service";
import {Router} from "@angular/router";

export function authGuardProviderFactory (authGuardService:AuthGuardService, router: Router):AuthGuard {
  let authGuard:AuthGuard;
  if (!authGuard) {
    authGuard = new AuthGuard(authGuardService, router);

  }
  return authGuard;
}

export let authGuardProvider = {
  provide: AuthGuard,
  useFactory: authGuardProviderFactory,
  deps: [AuthGuardService, Router]
};
