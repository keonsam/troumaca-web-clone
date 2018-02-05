import {StreetAddress} from "./street.address";
import {Page} from "../page/page";
import {Sort} from "../sort/sort";

export class StreetAddresses {

  private _streetAddresses:StreetAddress[] = [];
  private _page: Page;
  private _sort: Sort;

  get streetAddresses(): StreetAddress[] {
    return this._streetAddresses;
  }

  set streetAddresses(value: StreetAddress[]) {
    this._streetAddresses = value;
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
