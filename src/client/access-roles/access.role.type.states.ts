import {AccessRoleTypeState} from './access.role.type.state';
import {PageState} from '../page/page.state';
import {SortState} from '../sort/sort.state';

export class  AccessRoleTypeStates {
  private _accessRoleTypes: AccessRoleTypeState[];
  private _pageState: PageState;
  private _sortState: SortState;

  get accessRoleTypes(): AccessRoleTypeState[] {
    return this._accessRoleTypes;
  }

  set accessRoleTypes(value: AccessRoleTypeState[]) {
    this._accessRoleTypes = value;
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
