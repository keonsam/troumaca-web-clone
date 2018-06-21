import {ResourceType} from './resource.type';
import {Page} from '../page/page';
import {Sort} from '../sort/sort';

export class  ResourceTypes {
  private _resourceTypes: ResourceType[] = [];
  private _page: Page;
  private _sort: Sort;

  get resourceTypes(): ResourceType[] {
    return this._resourceTypes;
  }

  set resourceTypes(value: ResourceType[]) {
    this._resourceTypes = value;
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
