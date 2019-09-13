// import { OrganizationService } from "./organization.service";
// import {Apollo} from 'apollo-angular';
//
// export function organizationServiceProviderFactory (apollo: Apollo): OrganizationService {
//   let organizationService: OrganizationService;
//   if (!organizationService) {
//     organizationService = new OrganizationService(apollo);
//   }
//   return organizationService;
// }
//
// export let organizationServiceProvider = {
//   provide: OrganizationService,
//   useFactory: organizationServiceProviderFactory,
//   useClass: OrganizationService,
//   deps: [Apollo]
// };
