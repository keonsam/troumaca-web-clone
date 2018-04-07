import {ResourceState} from "./resource.state";
import {PageState} from "../page/page.state";
import {SortState} from "../sort/sort.state";

export class ResourceStates {
  private _resources: ResourceState[];
  private _pageState: PageState;
  private _sortState: SortState;

  get resources(): ResourceState[] {
    return this._resources;
  }

  set resources(value: ResourceState[]) {
    this._resources = value;
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
