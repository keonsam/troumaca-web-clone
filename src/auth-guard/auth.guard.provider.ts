import {AuthGuard} from "./auth.guard";
import {AuthGuardService} from "./auth.guard.service";

export function authGuardProviderFactory (authGuardService:AuthGuardService):AuthGuard {
  let authGuard:AuthGuard;
  if (!authGuard) {
    authGuard = new AuthGuard(authGuardService);

  }
  return authGuard;
}

export let authGuardProvider = {
  provide: AuthGuard,
  useFactory: authGuardProviderFactory,
  deps: [AuthGuardService]
};