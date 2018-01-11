import {Asset} from "./asset";
import {Page} from "../page/page";
import {Sort} from "../sort/sort";

export class Assets {

  private _assets:Asset[];
  private _page:Page;
  private _sort:Sort;

  get assets(): Asset[] {
    return this._assets;
  }

  set assets(value: Asset[]) {
    this._assets = value;
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