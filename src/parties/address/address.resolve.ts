// import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import {PartyService} from '../party.service';
// import {Address} from './address';
//
// export class AddressResolve implements Resolve<Address> {
//   constructor(private partyService: PartyService) {}
//
//   resolve(route: ActivatedRouteSnapshot) {
//     let type = '';
//     if (route.url[0].path === 'organization') {
//       type = 'organization';
//     }else {
//       type = 'user';
//     }
//     return this.partyService.getAddress(type);
//   }
//
// }
