import {OrganizationCreateRepository} from "./organization.create.repository";
import {OrganizationCreateService} from "./organization.create.service";

export function organizationCreateServiceProviderFactory (organizationCreateRepository: OrganizationCreateRepository): OrganizationCreateService {
  let organizationCreateService: OrganizationCreateService;
  if (!organizationCreateService) {
    organizationCreateService = new OrganizationCreateService(organizationCreateRepository);
  }
  return organizationCreateService;
}

export let organizationCreateServiceProvider = {
  provide: OrganizationCreateService,
  useFactory: organizationCreateServiceProviderFactory,
  useClass: OrganizationCreateService,
  deps: [OrganizationCreateRepository]
};
