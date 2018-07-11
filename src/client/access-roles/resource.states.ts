import {ResourceState} from './resource.state';
import {PageState} from '../page/page.state';
import {SortState} from '../sort/sort.state';

export class ResourceStates {
  private _resources: ResourceState[];
  private _page: PageState;
  private _sort: SortState;

  get resources(): ResourceState[] {
    return this._resources;
  }

  set resources(value: ResourceState[]) {
    this._resources = value;
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
