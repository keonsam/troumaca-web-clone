import {UnionOfPhysicalSite} from './asset.union.of.physical.site';

export class AssetUnionOfPhysicalSites {

  private _unionOfPhysicalSites: UnionOfPhysicalSite[];

  get unionOfPhysicalSites(): UnionOfPhysicalSite[] {
    return this._unionOfPhysicalSites;
  }

  set unionOfPhysicalSites(value: UnionOfPhysicalSite[]) {
    this._unionOfPhysicalSites = value;
  }

}
