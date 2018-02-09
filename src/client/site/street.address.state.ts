import {PhysicalSiteState} from "./physical.site.state";

export class StreetAddressState extends PhysicalSiteState {

  private _suiteOrApartment: string;
  private _floor: string;
  private _suiteOrApartmentNumber: string;
  private _streetNumber:string;
  private _street:string;

  get suiteOrApartment(): string {
    return this._suiteOrApartment;
  }

  set suiteOrApartment(value: string) {
    this._suiteOrApartment = value;
  }

  get floor(): string {
    return this._floor;
  }

  set floor(value: string) {
    this._floor = value;
  }

  get suiteOrApartmentNumber(): string {
    return this._suiteOrApartmentNumber;
  }

  set suiteOrApartmentNumber(value: string) {
    this._suiteOrApartmentNumber = value;
  }

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

      suiteOrApartment: this.suiteOrApartment,
      floor: this.floor,
      suiteOrApartmentNumber: this.suiteOrApartmentNumber,
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
