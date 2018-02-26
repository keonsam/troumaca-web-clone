import {Person} from "./person";
import {Sort} from "../sort/sort";
import {Page} from "../page/page";

export class Persons {

  private _persons:Person[] = [];
  private _page:Page;
  private _sort:Sort;

  get persons(): Person[] {
    return this._persons;
  }

  set persons(value: Person[]) {
    this._persons = value;
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
