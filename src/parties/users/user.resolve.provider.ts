import { UserResolve } from './user.resolve';
import { PartyService } from "../party.service";

export function userResolveProviderFactory (partyService: PartyService): UserResolve {
  let userResolve: UserResolve;
  if (!userResolve) {
    userResolve = new UserResolve(partyService);
  }
  return userResolve;
}

export let userResolveProvider = {
  provide: UserResolve,
  useFactory: userResolveProviderFactory,
  deps: [PartyService]
};
