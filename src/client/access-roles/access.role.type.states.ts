import {AccessRoleTypeState} from './access.role.type.state';
import {PageState} from '../page/page.state';
import {SortState} from '../sort/sort.state';

export class  AccessRoleTypeStates {
  private _accessRoleTypes: AccessRoleTypeState[];
  private _page: PageState;
  private _sort: SortState;

  get accessRoleTypes(): AccessRoleTypeState[] {
    return this._accessRoleTypes;
  }

  set accessRoleTypes(value: AccessRoleTypeState[]) {
    this._accessRoleTypes = value;
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
