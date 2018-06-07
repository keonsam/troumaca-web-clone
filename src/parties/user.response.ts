import {User} from "./user";
import {PartyAccessRole} from "./party.access.role";

export class UserResponse {
  private _user: User;
  private _partyAccessRoles: PartyAccessRole[];

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get partyAccessRoles(): PartyAccessRole[] {
    return this._partyAccessRoles;
  }

  set partyAccessRoles(value: PartyAccessRole[]) {
    this._partyAccessRoles = value;
  }
}
