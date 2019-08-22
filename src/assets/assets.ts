import {Asset} from './asset';
import {Page} from '../page/page';
import {Sort} from '../sort/sort';

export class Assets {
  assets: Asset[];
  page: Page;
  sort: Sort;
  constructor() {
    this.assets = [];
    this.page = new Page();
    this.sort = new Sort();
  }
}
