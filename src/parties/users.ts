import {User} from './user';
import {Sort} from '../sort/sort';
import {Page} from '../page/page';
import { PartyAccessRole} from './party.access.role';

export class Users {

  private _users: User[] = [];
  private _partyAccessRoles: PartyAccessRole[] = [];
  private _page: Page;
  private _sort: Sort;

  get users(): User[] {
    return this._users;
  }

  set users(value: User[]) {
    this._users = value;
  }

  get partyAccessRoles(): PartyAccessRole[] {
    return this._partyAccessRoles;
  }

  set partyAccessRoles(value: PartyAccessRole[]) {
    this._partyAccessRoles = value;
  }

  get page(): Page {
    return this._page;
  }

  set page(value: Page) {
    this._page = value;
  }

  get sort(): Sort {
    return this._sort;
  }

  set sort(value: Sort) {
    this._sort = value;
  }

}
