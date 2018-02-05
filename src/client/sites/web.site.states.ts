import {WebSiteState} from "./web.site.state";
import {PageState} from "../page/page.state";
import {SortState} from "../sort/sort.state";

export class WebSiteStates {

  private _webSites:WebSiteState[] = [];
  private _page:PageState;
  private _sort:SortState;

  constructor() {
    this.page = new PageState();
    this.sort = new SortState();
  }
  
  get webSites(): WebSiteState[] {
    return this._webSites;
  }

  set webSites(value: WebSiteState[]) {
    this._webSites = value;
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
