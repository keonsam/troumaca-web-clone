export class Characteristic {
  private _assetCharacteristicId: string;
  private _preFilled: boolean;
  private _preFilledValue: string;
  private _required: boolean;

  constructor(assetCharacteristicId?: string, preFilled?: boolean, preFilledValue?: string, required?:  boolean) {
    this._assetCharacteristicId = assetCharacteristicId;
    this._preFilled = preFilled;
    this._preFilledValue = preFilledValue;
    this._required = required;
  }


  get preFilledValue(): string {
    return this._preFilledValue;
  }

  set preFilledValue(value: string) {
    this._preFilledValue = value;
  }

  get assetCharacteristicId(): string {
    return this._assetCharacteristicId;
  }

  set assetCharacteristicId(value: string) {
    this._assetCharacteristicId = value;
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

  toJSON() {
    return {
      assetCharacteristicId: this.assetCharacteristicId,
      preFilled: this.preFilled,
      preFilledValue: this.preFilledValue,
      required: this.required
    }
  }
}
