import {OrganizationCreateClient} from "../../client/organization-create/organization.create.client";
import {OrganizationCreateRepository} from "../../organization-create/organization.create.repository";
import {OrganizationCreateRepositoryAdapter} from "./organization.create.repository.adapter";


export function organizationCreateRepositoryProviderFactory (organizationCreateClient: OrganizationCreateClient): OrganizationCreateRepository {
  let organizationRepositoryAdapter: OrganizationCreateRepositoryAdapter;
  if (!organizationRepositoryAdapter) {
    organizationRepositoryAdapter = new OrganizationCreateRepositoryAdapter(organizationCreateClient);
  }
  return organizationRepositoryAdapter;
}

export let organizationCreateRepositoryProvider = {
  provide: OrganizationCreateRepository,
  useFactory: organizationCreateRepositoryProviderFactory,
  deps: [OrganizationCreateClient]
};
