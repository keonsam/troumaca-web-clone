import {WebSite} from './web.site';
import {Page} from '../page/page';
import {Sort} from '../sort/sort';

export class WebSites {

  private _webSites: WebSite[] = [];
  private _page: Page;
  private _sort: Sort;

  get webSites(): WebSite[] {
    return this._webSites;
  }

  set webSites(value: WebSite[]) {
    this._webSites = value;
  }

  get page(): Page {
    return this._page;
  }

  set page(value: Page) {
    this._page = value;
  }

  get sort(): Sort {
    return this._sort;
  }

  set sort(value: Sort) {
    this._sort = value;
  }

}
