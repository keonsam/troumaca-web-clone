import {Party} from './party';
import {ContactInfo} from './contact-info/contact.info';
import {Address} from './address/address';

export class Organization extends Party {
  name: string;
  purpose: string;
  contactInfo: ContactInfo;
  address: Address;
  imgUrl: string;
  status: string;
  version: string;
}
