import {PostOfficeBoxState} from "./post.office.box.state";

export class StreetAddressState extends PostOfficeBoxState {

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

  toJson() {
    return {
      siteId: this.siteId,
      tenantId: this.tenantId,
      streetNumber: this.streetNumber,
      street: this.street,
      postOfficeBoxNumber: this.postOfficeBoxNumber,
      city: this.city,
      stateOrProvince: this.stateOrProvince,
      postalCode: this.postalCode,
      country: this.country
    }
  }

}
