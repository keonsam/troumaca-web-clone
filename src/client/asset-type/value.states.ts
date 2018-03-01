import {ValueState} from "./value.state";
import {PageState} from "../page/page.state";
import {SortState} from "../sort/sort.state";

export class ValueStates {
  private _values: ValueState[];
  private _page: PageState;
  private _sort: SortState;

  get values(): ValueState[] {
    return this._values;
  }

  set values(value: ValueState[]) {
    this.values = value;
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
