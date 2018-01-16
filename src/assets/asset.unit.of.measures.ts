 import {UnitOfMeasure} from "./asset.unit.of.measure";

export class UnitOfMeasures {

  private _unitOfMeasures:UnitOfMeasure[];

  get unitOfMeasures(): UnitOfMeasure[] {
    return this._unitOfMeasures;
  }

  set unitOfMeasures(value: UnitOfMeasure[]) {
    this._unitOfMeasures = value;
  }

}
