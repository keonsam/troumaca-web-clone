import {AuthGuardRepositoryAdapter} from './auth.guard.repository.adapter';
import {SessionClient} from '../../client/session/session.client';
import {AuthGuardService} from '../../auth-guard/auth.guard.service';
import {Apollo} from 'apollo-angular';

export function authGuardServiceProviderFactory (apollo: Apollo): AuthGuardService {
  let authGuardRepositoryAdapter: AuthGuardRepositoryAdapter;
  if (!authGuardRepositoryAdapter) {
    authGuardRepositoryAdapter = new AuthGuardRepositoryAdapter(apollo);
  }
  return authGuardRepositoryAdapter;
}

export let authGuardServiceProvider = {
  provide: AuthGuardService,
  useFactory: authGuardServiceProviderFactory,
  deps: [Apollo]
};
