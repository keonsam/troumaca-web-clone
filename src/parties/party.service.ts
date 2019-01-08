import {PartyRepository} from './party.repository';
import {Observable} from 'rxjs';
import {ContactInfo} from "./contact-info/contact.info";
import {ValidResponse} from "../authentication/valid.response";
import {Address} from "./address/address";

export class PartyService {


  constructor(private partyRepository: PartyRepository) {
  }


  isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
    return this.partyRepository.isValidUsername(username, partyId);
  }

  getContactInfo(type: string): Observable<ContactInfo> {
    return this.partyRepository.getContactInfo(type);
  }

  addContactInfo(type: string, contactInfo: ContactInfo): Observable<ContactInfo> {
    return this.partyRepository.addContactInfo(type, contactInfo);
  }

  updateContactInfo(type: string, contactInfo: ContactInfo): Observable<number> {
    return this.partyRepository.updateContactInfo(type, contactInfo);
  }

  // address

  getAddress(type: string): Observable<Address> {
    return this.partyRepository.getAddress(type);
  }

  addAddress(type: string, address: Address): Observable<Address> {
    return this.partyRepository.addAddress(type, address);
  }

  updateAddress(type: string, address: Address): Observable<number> {
    return this.partyRepository.updateAddress(type, address);
  }
}
