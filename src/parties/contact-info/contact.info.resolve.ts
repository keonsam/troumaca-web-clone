// import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import {PartyService} from '../party.service';
// import {ContactInfo} from './contact.info';
//
// export class ContactInfoResolve implements Resolve<ContactInfo> {
//   constructor(private partyService: PartyService) {}
//
//   resolve(route: ActivatedRouteSnapshot) {
//     let type = '';
//     if (route.url[0].path === 'organization') {
//       type = 'organization';
//     }else {
//       type = 'user';
//     }
//     return this.partyService.getContactInfo(type);
//   }
//
// }
