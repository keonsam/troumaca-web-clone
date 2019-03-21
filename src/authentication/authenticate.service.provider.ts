import {AuthenticationService} from './authentication.service';
import {AuthenticationRepository} from './authentication.repository';
import {Apollo} from 'apollo-angular';

export function authenticationServiceProviderFactory (apollo: Apollo): AuthenticationService {
  let authenticationService: AuthenticationService;
  if (!authenticationService) {
    authenticationService = new AuthenticationService(apollo);
  }
  return authenticationService;
}

export let authenticationServiceProvider = {
  provide: AuthenticationService,
  useFactory: authenticationServiceProviderFactory,
  useClass: AuthenticationService,
  deps: [Apollo]
};

// export function authenticationServiceProviderFactory (authenticationRepository: AuthenticationRepository): AuthenticationService {
//   let authenticationService: AuthenticationService;
//   if (!authenticationService) {
//     authenticationService = new AuthenticationService(authenticationRepository);
//   }
//   return authenticationService;
// }
//
// export let authenticationServiceProvider = {
//   provide: AuthenticationService,
//   useFactory: authenticationServiceProviderFactory,
//   useClass: AuthenticationService,
//   deps: [AuthenticationRepository]
// };
