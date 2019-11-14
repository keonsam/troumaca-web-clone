
export class SelectedAttribute {
  private _assetCharacteristicId: string;
  private _assetCharacteristicTypeId: string;
  private _name: string;
  private _preFilled: boolean;
  private _defaultValue: string;
  private _required: string;

  constructor(assetCharacteristicId?: string, name?: string, assetCharacteristicTypeId?: string) {
    this._assetCharacteristicId = assetCharacteristicId;
    this._name = name;
    this._assetCharacteristicTypeId = assetCharacteristicTypeId;
  }

  get assetCharacteristicTypeId(): string {
    return this._assetCharacteristicTypeId;
  }

  set assetCharacteristicTypeId(value: string) {
    this._assetCharacteristicTypeId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get defaultValue(): string {
    return this._defaultValue;
  }

  set defaultValue(value: string) {
    this._defaultValue = value;
  }


  get preFilled(): boolean {
    return this._preFilled;
  }

  set preFilled(value: boolean) {
    this._preFilled = value;
  }

  get required(): string {
    return this._required;
  }

  set required(value: string) {
    this._required = value;
  }

  get assetCharacteristicId(): string {
    return this._assetCharacteristicId;
  }

  set assetCharacteristicId(value: string) {
    this._assetCharacteristicId = value;
  }
}
