import {Party} from './party';
import {StreetAddress} from "../site/street.address";

export class Organization extends Party {
  name: string;
  purpose: string;
  email: string;
  number: string;
  streetAddress: StreetAddress;
  description: string;
}
