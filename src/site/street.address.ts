import {PostOfficeBox} from "./post.office.box";

export class StreetAddress extends PostOfficeBox {

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
