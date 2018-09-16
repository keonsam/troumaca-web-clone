import {Permission} from './permission';
import {Page} from '../page/page';
import {Sort} from '../sort/sort';

export class  Permissions {
  private _permissions: Permission[] = [];
  private _page: Page;
  private _sort: Sort;

  get permissions(): Permission[] {
    return this._permissions;
  }

  set permissions(value: Permission[]) {
    this._permissions = value;
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
