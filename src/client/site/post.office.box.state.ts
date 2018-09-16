import {PhysicalSiteState} from './physical.site.state';

export class PostOfficeBoxState extends PhysicalSiteState {

  private _postOfficeBoxNumber: string;

  get postOfficeBoxNumber(): string {
    return this._postOfficeBoxNumber;
  }

  set postOfficeBoxNumber(value: string) {
    this._postOfficeBoxNumber = value;
  }

  toJson() {
    return {
      siteId: this.siteId,
      tenantId: this.tenantId,
      name: this.name,
      description: this.description,

      postOfficeBoxNumber: this.postOfficeBoxNumber,

      city: this.city,
      stateOrProvince: this.stateOrProvince,
      postalCode: this.postalCode,
      country: this.country,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    }
  }
}
