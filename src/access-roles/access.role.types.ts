import {AccessRoleType} from './access.role.type';
import {Page} from '../page/page';
import {Sort} from '../sort/sort';

export class  AccessRoleTypes {
  private _accessRoleTypes: AccessRoleType[] = [];
  private _page: Page;
  private _sort: Sort;

  get accessRoleTypes(): AccessRoleType[] {
    return this._accessRoleTypes;
  }

  set accessRoleTypes(value: AccessRoleType[]) {
    this._accessRoleTypes = value;
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
