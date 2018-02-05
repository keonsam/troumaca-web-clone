import {Email} from "./email";
import {Page} from "../page/page";
import {Sort} from "../sort/sort";

export class Emails {

  private _emails:Email[] = [];
  private _page:Page;
  private _sort:Sort;
  
  get emails(): Email[] {
    return this._emails;
  }

  set emails(value: Email[]) {
    this._emails = value;
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
