import { UserResolve } from './user.resolve';
import { UserService } from "./user.service";

export function userResolveProviderFactory (userService: UserService): UserResolve {
  let userResolve: UserResolve;
  if (!userResolve) {
    userResolve = new UserResolve(userService);
  }
  return userResolve;
}

export let userResolveProvider = {
  provide: UserResolve,
  useFactory: userResolveProviderFactory,
  deps: [UserService]
};
