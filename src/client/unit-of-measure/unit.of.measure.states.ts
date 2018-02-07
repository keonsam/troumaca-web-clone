import {UnitOfMeasureState} from "./unit.of.measure.state";

export class UnitOfMeasureStates {

  private _unitOfMeasures:UnitOfMeasureState[];

  get unitOfMeasures(): UnitOfMeasureState[] {
    return this._unitOfMeasures;
  }

  set unitOfMeasures(value: UnitOfMeasureState[]) {
    this._unitOfMeasures = value;
  }

}