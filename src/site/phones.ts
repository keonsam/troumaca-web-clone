import {Phone} from './phone';
import {Page} from '../page/page';
import {Sort} from '../sort/sort';

export class Phones  {

  private _phones: Phone[] = [];
  private _page: Page;
  private _sort: Sort;

  get phones(): Phone[] {
    return this._phones;
  }

  set phones(value: Phone[]) {
    this._phones = value;
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
