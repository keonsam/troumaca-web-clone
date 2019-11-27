import {Attribute} from "./attribute";

export class SelectedAttribute extends Attribute {
  private _preFilled: boolean;
  private _preFilledValue: string;
  private _required: boolean;

  constructor(assetCharacteristicId?: string, name?: string, assetCharacteristicTypeId?: string) {
    super();
    this.assetCharacteristicId = assetCharacteristicId;
    this.name = name;
    this.assetCharacteristicTypeId = assetCharacteristicTypeId;
  }

  get preFilledValue(): string {
    return this._preFilledValue;
  }

  set preFilledValue(value: string) {
    this._preFilledValue = value;
  }

  get preFilled(): boolean {
    return this._preFilled;
  }

  set preFilled(value: boolean) {
    this._preFilled = value;
  }

  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = value;
  }
}
