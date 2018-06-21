import {Sort} from '../sort/sort';
import {Page} from '../page/page';
import {Shipment} from './shipment';

export class Shipments {

  private _shipments: Shipment[] = [];
  private _page: Page;
  private _sort: Sort;


  get shipments(): Shipment[] {
    return this._shipments;
  }

  set shipments(value: Shipment[]) {
    this._shipments = value;
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
