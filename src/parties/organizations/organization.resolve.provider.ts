import { OrganizationResolve } from './organization.resolve';
import {OrganizationService} from "./organization.service";

export function organizationResolveProviderFactory (organizationService: OrganizationService): OrganizationResolve {
  let organizationResolve: OrganizationResolve;
  if (!organizationResolve) {
    organizationResolve = new OrganizationResolve(organizationService);
  }
  return organizationResolve;
}

export let organizationResolveProvider = {
  provide: OrganizationResolve,
  useFactory: organizationResolveProviderFactory,
  deps: [OrganizationService]
};
