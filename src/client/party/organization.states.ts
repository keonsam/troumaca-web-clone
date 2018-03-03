import {OrganizationState} from "./organization.state";
import {PageState} from "../page/page.state";
import {SortState} from "../sort/sort.state";

export class OrganizationStates {

  private _organizations:OrganizationState[];
  private _page: PageState;
  private _sort: SortState;

  get organizations(): OrganizationState[] {
    return this._organizations;
  }

  set organizations(value: OrganizationState[]) {
    this._organizations = value;
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
