import {PermissionState} from './permission.state';
import {PageState} from '../page/page.state';
import {SortState} from '../sort/sort.state';

export class PermissionStates {
  private _permissions: PermissionState[];
  private _pageState: PageState;
  private _sortState: SortState;

  get permissions(): PermissionState[] {
    return this._permissions;
  }

  set permissions(value: PermissionState[]) {
    this._permissions = value;
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
