import {SiteState} from "./site.state";

export class PhysicalSiteState extends SiteState {

  private _city:string;
  private _stateOrProvince:string;
  private _postalCode:string;
  private _country:string;

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get stateOrProvince(): string {
    return this._stateOrProvince;
  }

  set stateOrProvince(value: string) {
    this._stateOrProvince = value;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

}