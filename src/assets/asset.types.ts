import {AssetType} from "./asset.type";

export class AssetTypes {

  private _assetTypes:AssetType[];


  get assetTypes(): AssetType[] {
    return this._assetTypes;
  }

  set assetTypes(value: AssetType[]) {
    this._assetTypes = value;
  }
}