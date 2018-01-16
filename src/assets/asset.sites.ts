import {Site} from "./asset.site";

export class Sites {

  private _sites:Site[];

  get sites(): Site[] {
    return this._sites;
  }

  set sites(value: Site[]) {
    this._sites = value;
  }
}