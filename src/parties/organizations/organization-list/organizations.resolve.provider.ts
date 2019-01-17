import { OrganizationService} from '../organization.service';
import {OrganizationsResolve} from './organizations.resolve';

export function organizationsResolveProviderFactory (organizationService: OrganizationService): OrganizationsResolve {
  return new OrganizationsResolve(organizationService);
}

export let organizationsResolveProvider = {
  provide: OrganizationsResolve,
  useFactory: organizationsResolveProviderFactory,
  deps: [OrganizationService]
};
