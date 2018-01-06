import {AssetTypeState} from "./asset.type.state";

export class AssetTypeStates {

  private _assetTypes:AssetTypeState[];

  get assetTypes(): AssetTypeState[] {
    return this._assetTypes;
  }

  set assetTypes(assetTypes: AssetTypeState[]) {
    this._assetTypes = assetTypes;
  }
}