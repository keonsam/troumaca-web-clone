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

  toJson() {
    return {
      siteId: this.siteId,
      tenantId: this.tenantId,
      name: this.name,
      description: this.description,

      streetNumber: this.streetNumber,
      street: this.street,

      city: this.city,
      stateOrProvince: this.stateOrProvince,
      postalCode: this.postalCode,
      country: this.country,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn

    }
  }

}
