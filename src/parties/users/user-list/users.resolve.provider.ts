import { UsersResolve } from './users.resolve';
import { UserService } from '../user.service';

export function usersResolveProviderFactory (userService: UserService): UsersResolve {
  return new UsersResolve(userService);
}

export let usersResolveProvider = {
  provide: UsersResolve,
  useFactory: usersResolveProviderFactory,
  deps: [UserService]
};
