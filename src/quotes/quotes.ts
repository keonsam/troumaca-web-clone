import {Sort} from "../sort/sort";
import {Page} from "../page/page";
import {Quote} from "./quote";

export class Quotes {

  private _quotes: Quote[] = [];
  private _page: Page;
  private _sort: Sort;


  get quotes(): Quote[] {
    return this._quotes;
  }

  set quotes(value: Quote[]) {
    this._quotes = value;
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