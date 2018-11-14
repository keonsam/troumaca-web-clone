import {Permission} from './permission';
import {Page} from '../page/page';
import {Sort} from '../sort/sort';

export class  Permissions {
  permissions: Permission[] = [];
  page: Page;
  sort: Sort;
}
