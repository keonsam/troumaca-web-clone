import { PeoplesResolve } from './peoples.resolve';
import {PeopleService} from '../people.service';

export function usersResolveProviderFactory (userService: PeopleService): PeoplesResolve {
  return new PeoplesResolve(userService);
}

export let peoplesResolveProvider = {
  provide: PeoplesResolve,
  useFactory: usersResolveProviderFactory,
  deps: [PeopleService]
};
