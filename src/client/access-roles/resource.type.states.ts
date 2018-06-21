import {ResourceTypeState} from './resource.type.state';
import {PageState} from '../page/page.state';
import {SortState} from '../sort/sort.state';

export class ResourceTypeStates {
  private _resourceTypes: ResourceTypeState[];
  private _pageState: PageState;
  private _sortState: SortState;

  get resourceTypes(): ResourceTypeState[] {
    return this._resourceTypes;
  }

  set resourceTypes(value: ResourceTypeState[]) {
    this._resourceTypes = value;
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
