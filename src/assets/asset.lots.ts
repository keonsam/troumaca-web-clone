import {Lot} from './asset.lot';

export class Lots {

  private _lots: Lot[];

  get sites(): Lot[] {
    return this._lots;
  }

  set sites(value: Lot[]) {
    this._lots = value;
  }
}
