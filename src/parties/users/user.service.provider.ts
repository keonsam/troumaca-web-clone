import {UserService} from './user.service';
import {UserRepository} from './user.repository';
import {Apollo} from 'apollo-angular';

export function userServiceProviderFactory (apollo: Apollo): UserService {
  let userService: UserService;
  if (!userService) {
    userService = new UserService(apollo);
  }
  return userService;
}

export let userServiceProvider = {
  provide: UserService,
  useFactory: userServiceProviderFactory,
  useClass: UserService,
  deps: [Apollo]
};
