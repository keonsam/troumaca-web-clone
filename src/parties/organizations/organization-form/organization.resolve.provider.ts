import { OrganizationResolve } from './organization.resolve';
import {OrganizationService} from '../organization.service';

export function organizationResolveProviderFactory (organizationService: OrganizationService): OrganizationResolve {
  return new OrganizationResolve(organizationService);
}

export let organizationResolveProvider = {
  provide: OrganizationResolve,
  useFactory: organizationResolveProviderFactory,
  deps: [OrganizationService]
};
