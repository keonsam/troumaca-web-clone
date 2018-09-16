import {Organization} from './organization';
import {Sort} from '../sort/sort';
import {Page} from '../page/page';

export class Organizations {

  private _organizations: Organization[] = [];
  private _page: Page;
  private _sort: Sort;

  get organizations(): Organization[] {
    return this._organizations;
  }

  set organizations(value: Organization[]) {
    this._organizations = value;
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
