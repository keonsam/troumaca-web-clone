import {Observable} from 'rxjs';
import {ValidResponse} from "../authentication/valid.response";
import {ContactInfo} from "./contact-info/contact.info";
import {Address} from "./address/address";

export abstract class PartyRepository {
  abstract isValidUsername(username: string, partyId?: string): Observable<ValidResponse>;
  abstract getContactInfo(type: string): Observable<ContactInfo>;
  abstract addContactInfo(type: string, contactInfo: ContactInfo): Observable<ContactInfo>;
  abstract updateContactInfo(type: string, contactInfo: ContactInfo): Observable<number>;

  // address
  abstract getAddress(type: string): Observable<Address>;
  abstract addAddress(type: string, address: Address): Observable<Address>;
  abstract updateAddress(type: string, address: Address): Observable<number>;
}
