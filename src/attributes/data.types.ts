import {DataType} from "./data.type";

export class DataTypes {

  private _dataTypes:DataType[];

  get dataTypes(): DataType[] {
    return this._dataTypes;
  }

  set dataTypes(value: DataType[]) {
    this._dataTypes = value;
  }

}
