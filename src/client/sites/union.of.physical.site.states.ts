import {UnionOfPhysicalSiteState} from "./union.of.physical.site.state";

export class UnionOfPhysicalSiteStates {

  private _unionOfPhysicalSites:UnionOfPhysicalSiteState[];

  get unionOfPhysicalSites(): UnionOfPhysicalSiteState[] {
    return this._unionOfPhysicalSites;
  }

  set unionOfPhysicalSites(value: UnionOfPhysicalSiteState[]) {
    this._unionOfPhysicalSites = value;
  }

}