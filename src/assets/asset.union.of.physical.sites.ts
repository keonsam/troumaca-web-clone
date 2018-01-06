import {AssetUnionOfPhysicalSite} from "./asset.union.of.physical.site";

export class AssetUnionOfPhysicalSites {

  private _unionOfPhysicalSites:AssetUnionOfPhysicalSite[];

  get unionOfPhysicalSites(): AssetUnionOfPhysicalSite[] {
    return this._unionOfPhysicalSites;
  }

  set unionOfPhysicalSites(value: AssetUnionOfPhysicalSite[]) {
    this._unionOfPhysicalSites = value;
  }

}