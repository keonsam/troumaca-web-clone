// import {Party} from './party';
// import {PartyAccessRole} from './party.access.role';
// import {Address} from './address/address';
// import {ContactInfo} from './contact-info/contact.info';

export class User {
  partyId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  address: any;
  contactInfo: any;
  partyAccessRoles: any[];
  status: string;
  version: String;

  get name(): string {
    return `${this.lastName || ''}, ${this.firstName || ''}`;
  }

}
