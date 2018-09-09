import { OrganizationService } from "./organization.service";
import { OrganizationRepository } from "./organization.repository";

export function organizationServiceProviderFactory (organizationRepository: OrganizationRepository): OrganizationService {
  let organizationService: OrganizationService;
  if (!organizationService) {
    organizationService = new OrganizationService(organizationRepository);
  }
  return organizationService;
}

export let organizationServiceProvider = {
  provide: OrganizationService,
  useFactory: organizationServiceProviderFactory,
  useClass: OrganizationService,
  deps: [OrganizationRepository]
};
