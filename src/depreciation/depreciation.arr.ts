import {Depreciation} from "./depreciation";
import {Page} from "../page/page";
import {Sort} from "../sort/sort";

export class DepreciationArr {
  private _depreciation: Depreciation[] = [];
  private _page: Page;
  private _sort: Sort;

  get depreciation(): Depreciation[] {
    return this._depreciation;
  }

  set depreciation(value: Depreciation[]) {
    this._depreciation = value;
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
