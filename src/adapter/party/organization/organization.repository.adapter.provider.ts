import { OrganizationRepositoryAdapter} from './organization.repository.adapter';
import { OrganizationClient } from '../../../client/party/organization/organization.client';
import { OrganizationRepository } from '../../../parties/organizations/organization.repository';

export function organizationRepositoryProviderFactory (organizationClient: OrganizationClient): OrganizationRepository {
  let organizationRepositoryAdapter: OrganizationRepositoryAdapter;
  if (!organizationRepositoryAdapter) {
    organizationRepositoryAdapter = new OrganizationRepositoryAdapter(organizationClient);
  }
  return organizationRepositoryAdapter;
}

export let organizationRepositoryProvider = {
  provide: OrganizationRepository,
  useFactory: organizationRepositoryProviderFactory,
  deps: [OrganizationClient]
};
