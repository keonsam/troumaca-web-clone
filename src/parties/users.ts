import {User} from './user';
import {Sort} from '../sort/sort';
import {Page} from '../page/page';

export class Users {

  users: User[] = [];
  page: Page;
  sort: Sort;
}
