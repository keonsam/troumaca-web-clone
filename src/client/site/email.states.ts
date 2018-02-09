import {EmailState} from "./email.state";
import {PageState} from "../page/page.state";
import {SortState} from "../sort/sort.state";

export class EmailStates {

  private _emails:EmailState[] = [];
  private _page:PageState;
  private _sort:SortState;

  constructor() {
    this.page = new PageState();
    this.sort = new SortState();
  }
  
  get emails(): EmailState[] {
    return this._emails;
  }

  set emails(value: EmailState[]) {
    this._emails = value;
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
