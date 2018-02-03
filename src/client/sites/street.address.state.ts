import {PhysicalSiteState} from "./physical.site.state";

export class StreetAddressState extends PhysicalSiteState {

  private _streetNumber:string;
  private _street:string;

  get streetNumber(): string {
    return this._streetNumber;
  }

  set streetNumber(value: string) {
    this._streetNumber = value;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }

}