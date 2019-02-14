import { UserService} from '../user.service';
import {UserMeResolve} from './user.me.resolve';

export function userMeResolveProviderFactory (userService: UserService): UserMeResolve {
  return new UserMeResolve(userService);
}

export let userMeResolveProvider = {
  provide: UserMeResolve,
  useFactory: userMeResolveProviderFactory,
  deps: [UserService]
};
