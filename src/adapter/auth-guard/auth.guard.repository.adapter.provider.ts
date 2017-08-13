import {AuthGuardRepositoryAdapter} from "./auth.guard.repository.adapter";
import {SessionClient} from "../../client/session/session.client";
import {AuthGuardService} from "../../auth-guard/auth.guard.service";

export function authGuardServiceProviderFactory (sessionClient:SessionClient):AuthGuardService {
  let authGuardRepositoryAdapter: AuthGuardRepositoryAdapter;
  if (!authGuardRepositoryAdapter) {
    authGuardRepositoryAdapter = new AuthGuardRepositoryAdapter(sessionClient);
  }
  return authGuardRepositoryAdapter;
}

export let authGuardServiceProvider = {
  provide: AuthGuardService,
  useFactory: authGuardServiceProviderFactory,
  deps: [SessionClient]
};