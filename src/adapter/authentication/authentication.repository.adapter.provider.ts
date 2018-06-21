import {AuthenticationRepositoryAdapter} from './authentication.repository.adapter';
import {AuthenticationClient} from '../../client/credential/authentication.client';
import {AuthenticationRepository} from '../../authentication/authentication.repository';

export function authenticationRepositoryFactory (authenticationClient: AuthenticationClient): AuthenticationRepository {
  let authenticationRepositoryAdapter: AuthenticationRepositoryAdapter;

  if (!authenticationRepositoryAdapter) {
    authenticationRepositoryAdapter = new AuthenticationRepositoryAdapter(authenticationClient);
  }

  return authenticationRepositoryAdapter;
}

export let authenticationRepositoryProvider = {
  provide: AuthenticationRepository,
  useFactory: authenticationRepositoryFactory,
  deps: [AuthenticationClient]
};
