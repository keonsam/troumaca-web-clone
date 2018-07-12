import {PermissionState} from './permission.state';
import {PageState} from '../page/page.state';
import {SortState} from '../sort/sort.state';

export class PermissionStates {
  private _permissions: PermissionState[];
  private _page: PageState;
  private _sort: SortState;

  get permissions(): PermissionState[] {
    return this._permissions;
  }

  set permissions(value: PermissionState[]) {
    this._permissions = value;
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
