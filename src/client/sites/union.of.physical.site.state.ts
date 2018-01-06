export class UnionOfPhysicalSiteState {
  private _siteId:string;
  private _streetNumber:string;
  private _street:string;
  private _ostOfficeBoxNumber:string;
  private _city:string;
  private _stateOrProvince:string;
  private _postalCode:string;
  private _country:string;

  get siteId(): string {
    return this._siteId;
  }

  set siteId(value: string) {
    this._siteId = value;
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

  get ostOfficeBoxNumber(): string {
    return this._ostOfficeBoxNumber;
  }

  set ostOfficeBoxNumber(value: string) {
    this._ostOfficeBoxNumber = value;
  }

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