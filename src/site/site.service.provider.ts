// import {SiteService} from './site.service';
// import {SiteRepository} from './site.repository';
//
// export function siteServiceProviderFactory (siteRepository: SiteRepository): SiteService {
//   let siteService: SiteService;
//   if (!siteService) {
//     siteService = new SiteService(siteRepository);
//   }
//   return siteService;
// }
//
// export let siteServiceProvider = {
//   provide: SiteService,
//   useFactory: siteServiceProviderFactory,
//   useClass: SiteService,
//   deps: [SiteRepository]
// };
