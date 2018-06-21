import {AuthenticationService} from './authentication.service';
import {AuthenticationRepository} from './authentication.repository';

export function authenticationServiceProviderFactory (authenticationRepository: AuthenticationRepository): AuthenticationService {
  let authenticationService: AuthenticationService;
  if (!authenticationService) {
    authenticationService = new AuthenticationService(authenticationRepository);
  }
  return authenticationService;
}

export let authenticationServiceProvider = {
  provide: AuthenticationService,
  useFactory: authenticationServiceProviderFactory,
  useClass: AuthenticationService,
  deps: [AuthenticationRepository]
};
