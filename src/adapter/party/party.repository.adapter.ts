// import {PartyRepository} from '../../parties/party.repository';
// import {PartyClient} from '../../client/party/party.client';
// import {Observable} from 'rxjs';
// import {ValidResponse} from "../../authentication/valid.response";
// import {ContactInfo} from "../../parties/contact-info/contact.info";
// import {Address} from "../../parties/address/address";
//
// export class PartyRepositoryAdapter extends PartyRepository {
//
//   constructor(private partyClient: PartyClient) {
//     super();
//   }
//
//   isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
//     return this.partyClient.isValidUsername(username, partyId);
//   }
//
//
//   getContactInfo(type: string): Observable<ContactInfo> {
//     return this.partyClient.getContactInfo(type);
//   }
//
//   addContactInfo(type: string, contactInfo: ContactInfo): Observable<ContactInfo> {
//     return this.partyClient.addContactInfo(type, contactInfo);
//   }
//
//   updateContactInfo(type: string, contactInfo: ContactInfo): Observable<number> {
//     return this.partyClient.updateContactInfo(type, contactInfo);
//   }
//
//   // address
//
//   getAddress(type: string): Observable<Address> {
//     return this.partyClient.getAddress(type);
//   }
//
//   addAddress(type: string, address: Address): Observable<Address> {
//     return this.partyClient.addAddress(type, address);
//   }
//
//   updateAddress(type: string, address: Address): Observable<number> {
//     return this.partyClient.updateAddress(type, address);
//   }
//
// }
