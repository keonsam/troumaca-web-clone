import {AssetType} from "./asset.type";
import {Value} from "./value";
import {AssignedAttribute} from "../asset-type-classes/assigned.attribute";

export class AssetTypeResponse {

  private _assetType: AssetType;
  private _values: Value[];

  get assetType(): AssetType {
    return this._assetType;
  }

  set assetType(value: AssetType) {
    this._assetType = value;
  }

  get values(): Value[] {
    return this._values;
  }

  set values(value: Value[]) {
    this._values = value;
  }

}
