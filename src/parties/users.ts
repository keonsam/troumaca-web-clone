import {User} from './user';
import {Sort} from '../sort/sort';
import {Page} from '../page/page';
import { PartyAccessRole} from './party.access.role';

export class Users {

  users: User[] = [];
  partyAccessRoles: PartyAccessRole[] = [];
  page: Page;
  sort: Sort;
}
