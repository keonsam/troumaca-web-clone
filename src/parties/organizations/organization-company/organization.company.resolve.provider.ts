import {OrganizationService} from '../organization.service';
import {OrganizationCompanyResolve} from './organization.company.resolve';

export function organizationCompanyResolveProviderFactory (organizationService: OrganizationService): OrganizationCompanyResolve {
  return new OrganizationCompanyResolve(organizationService);
}

export let organizationCompanyResolveProvider = {
  provide: OrganizationCompanyResolve,
  useFactory: organizationCompanyResolveProviderFactory,
  deps: [OrganizationService]
};
