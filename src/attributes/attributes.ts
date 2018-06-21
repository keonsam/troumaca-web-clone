import {Attribute} from './attribute';
import {Page} from '../page/page';
import {Sort} from '../sort/sort';

export class Attributes {

  private _attributes: Attribute[] = [];
  private _page: Page;
  private _sort: Sort;

  get attributes(): Attribute[] {
    return this._attributes;
  }

  set attributes(value: Attribute[]) {
    this._attributes = value;
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
