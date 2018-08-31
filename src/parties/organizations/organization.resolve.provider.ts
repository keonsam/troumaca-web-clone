import { OrganizationResolve } from './organization.resolve';
import { PartyService } from "../party.service";

export function organizationResolveProviderFactory (partyService: PartyService): OrganizationResolve {
  let organizationResolve: OrganizationResolve;
  if (!organizationResolve) {
    organizationResolve = new OrganizationResolve(partyService);
  }
  return organizationResolve;
}

export let organizationResolveProvider = {
  provide: OrganizationResolve,
  useFactory: organizationResolveProviderFactory,
  deps: [PartyService]
};
