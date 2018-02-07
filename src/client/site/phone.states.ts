import {PhoneState} from "./phone.state";
import {PageState} from "../page/page.state";
import {SortState} from "../sort/sort.state";

export class PhoneStates {

  private _phones:PhoneState[] = [];
  private _page:PageState;
  private _sort:SortState;

  constructor() {
    this.page = new PageState();
    this.sort = new SortState();
  }

  get phones(): PhoneState[] {
    return this._phones;
  }

  set phones(value: PhoneState[]) {
    this._phones = value;
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