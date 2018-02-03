import {PostOfficeBoxState} from "./post.office.box.state";
import {PageState} from "../page/page.state";
import {SortState} from "../sort/sort.state";

export class PostOfficeBoxStates {

  private _postOfficeBoxes:PostOfficeBoxState[] = [];
  private _page:PageState;
  private _sort:SortState;

  constructor() {
    this.page = new PageState();
    this.sort = new SortState();
  }

  get postOfficeBoxes(): PostOfficeBoxState[] {
    return this._postOfficeBoxes;
  }

  set postOfficeBoxes(value: PostOfficeBoxState[]) {
    this._postOfficeBoxes = value;
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
