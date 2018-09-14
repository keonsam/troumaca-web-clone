import {VirtualSiteState} from './virtual.site.state';

export class WebSiteState extends VirtualSiteState {

  private _uniformResourceIdentifier: string;

  get uniformResourceIdentifier(): string {
    return this._uniformResourceIdentifier;
  }

  set uniformResourceIdentifier(value: string) {
    this._uniformResourceIdentifier = value;
  }

  toJson() {
    return {
      siteId: this.siteId,
      tenantId: this.tenantId,
      name: this.name,
      description: this.description,

      uniformResourceIdentifier: this.uniformResourceIdentifier,

      createdOn: this.createdOn,
      removedOn: this.removedOn
    }
  }
}
