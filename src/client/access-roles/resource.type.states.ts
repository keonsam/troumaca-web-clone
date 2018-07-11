import {ResourceTypeState} from './resource.type.state';
import {PageState} from '../page/page.state';
import {SortState} from '../sort/sort.state';

export class ResourceTypeStates {
  private _resourceTypes: ResourceTypeState[];
  private _page: PageState;
  private _sort: SortState;

  get resourceTypes(): ResourceTypeState[] {
    return this._resourceTypes;
  }

  set resourceTypes(value: ResourceTypeState[]) {
    this._resourceTypes = value;
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
