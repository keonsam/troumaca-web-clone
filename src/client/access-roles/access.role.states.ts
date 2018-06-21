import {AccessRoleState} from './access.role.state';
import {PageState} from '../page/page.state';
import {SortState} from '../sort/sort.state';

export class  AccessRoleStates {
  private _accessRoles: AccessRoleState[];
  private _pageState: PageState;
  private _sortState: SortState;

  get accessRoles(): AccessRoleState[] {
    return this._accessRoles;
  }

  set accessRoles(value: AccessRoleState[]) {
    this._accessRoles = value;
  }

  get pageState(): PageState {
    return this._pageState;
  }

  set pageState(value: PageState) {
    this._pageState = value;
  }

  get sortState(): SortState {
    return this._sortState;
  }

  set sortState(value: SortState) {
    this._sortState = value;
  }
}
