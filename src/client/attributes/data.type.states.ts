import {DataTypeState} from "./data.type.state";

export class DataTypeStates {

  private _dataTypes:DataTypeState[];

  get dataTypes(): DataTypeState[] {
    return this._dataTypes;
  }

  set dataTypes(dataTypes: DataTypeState[]) {
    this._dataTypes = dataTypes;
  }
}
