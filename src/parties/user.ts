import {Party} from './party';
import {PartyAccessRole} from './party.access.role';
import {Address} from './address/address';
import {ContactInfo} from './contact-info/contact.info';

export class User extends Party {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  address: Address;
  contactInfo: ContactInfo;
  partyAccessRoles: PartyAccessRole[];
  status: string;
  version: String;

  get name(): string {
    return `${this.lastName || ''}, ${this.firstName || ''}`;
  }

}
