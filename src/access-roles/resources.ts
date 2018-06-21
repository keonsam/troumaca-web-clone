import {Resource} from './resource';
import {Page} from '../page/page';
import {Sort} from '../sort/sort';

export class  Resources {
  private _resources: Resource[] = [];
  private _page: Page;
  private _sort: Sort;

  get resources(): Resource[] {
    return this._resources;
  }

  set resources(value: Resource[]) {
    this._resources = value;
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
