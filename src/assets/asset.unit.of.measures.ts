 import {AssetUnitOfMeasure} from "./asset.unit.of.measure";

export class AssetUnitOfMeasures {

  private _unitOfMeasures:AssetUnitOfMeasure[];

  get unitOfMeasures(): AssetUnitOfMeasure[] {
    return this._unitOfMeasures;
  }

  set unitOfMeasures(value: AssetUnitOfMeasure[]) {
    this._unitOfMeasures = value;
  }

}
