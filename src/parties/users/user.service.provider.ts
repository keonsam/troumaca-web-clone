import {UserService} from './user.service';
import {UserRepository} from './user.repository';

export function userServiceProviderFactory (userRepository: UserRepository): UserService {
  let userService: UserService;
  if (!userService) {
    userService = new UserService(userRepository);
  }
  return userService;
}

export let userServiceProvider = {
  provide: UserService,
  useFactory: userServiceProviderFactory,
  useClass: UserService,
  deps: [UserRepository]
};
