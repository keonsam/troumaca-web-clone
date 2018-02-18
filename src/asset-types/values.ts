import {Value} from "./value";
import {Page} from "../page/page";
import {Sort} from "../sort/sort";

export class Values {
  private _values: Value[] = [];
  private _page: Page;
  private _sort: Sort;

  get values(): Value[] {
    return this._values;
  }

  set values(value: Value[]) {
    this._values = value;
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
