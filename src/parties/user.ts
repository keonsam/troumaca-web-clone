import {Party} from './party';
import {PartyAccessRole} from "./party.access.role";

export class User extends Party {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  partyAccessRoles: PartyAccessRole[];

  get name(): string {
    return `${this.lastName || ''}, ${this.firstName || ''}`;
  }

}
