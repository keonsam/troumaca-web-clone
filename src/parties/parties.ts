import {Party} from './party';
import {Sort} from '../sort/sort';
import {Page} from '../page/page';

export class Parties {

  private _parties: Party[] = [];
  private _page: Page;
  private _sort: Sort;

  get parties(): Party[] {
    return this._parties;
  }

  set parties(value: Party[]) {
    this._parties = value;
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
