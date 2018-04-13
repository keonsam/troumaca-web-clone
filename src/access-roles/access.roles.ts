import {AccessRole} from "./access.role";
import {Page} from "../page/page";
import {Sort} from "../sort/sort";

export class  AccessRoles {
  private _accessRoles: AccessRole[] = [];
  private _page: Page;
  private _sort: Sort;

  get accessRoles(): AccessRole[] {
    return this._accessRoles;
  }

  set accessRoles(value: AccessRole[]) {
    this._accessRoles = value;
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
