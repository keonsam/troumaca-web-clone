import {UserState} from "./user.state";
import {PartyAccessRoleState} from "./party.access.role.state";
import {PageState} from "../page/page.state";
import {SortState} from "../sort/sort.state";

export class UserStates {

  private _users:UserState[];
  private _partyAccessRoles: PartyAccessRoleState[];
  private _page: PageState;
  private _sort: SortState;

  get users(): UserState[] {
    return this._users;
  }

  set users(value: UserState[]) {
    this._users = value;
  }
  
  get partyAccessRoles(): PartyAccessRoleState[] {
    return this._partyAccessRoles;
  }

  set partyAccessRoles(value: PartyAccessRoleState[]) {
    this._partyAccessRoles = value;
  }

  get page(): PageState {
    return this._page;
  }

  set page(value: PageState) {
    this._page = value;
  }

  get sort(): SortState {
    return this._sort;
  }

  set sort(value: SortState) {
    this._sort = value;
  }

}
