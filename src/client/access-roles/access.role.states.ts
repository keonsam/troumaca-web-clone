import {AccessRoleState} from './access.role.state';
import {PageState} from '../page/page.state';
import {SortState} from '../sort/sort.state';

export class  AccessRoleStates {
  private _accessRoles: AccessRoleState[];
  private _page: PageState;
  private _sort: SortState;

  get accessRoles(): AccessRoleState[] {
    return this._accessRoles;
  }

  set accessRoles(value: AccessRoleState[]) {
    this._accessRoles = value;
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
