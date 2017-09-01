export class AssetTypeAttributeState {

  private _assetTypeAttributeId:string;
  private _name:string;
  private _format:string;
  private _unitOfMeasure:string;
  private _defaultHighValue;
  private _defaultLowValue;


  get assetTypeAttributeId(): string {
    return this._assetTypeAttributeId;
  }

  set assetTypeAttributeId(value: string) {
    this._assetTypeAttributeId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get format(): string {
    return this._format;
  }

  set format(value: string) {
    this._format = value;
  }

  get unitOfMeasure(): string {
    return this._unitOfMeasure;
  }

  set unitOfMeasure(value: string) {
    this._unitOfMeasure = value;
  }

  get defaultHighValue() {
    return this._defaultHighValue;
  }

  set defaultHighValue(value) {
    this._defaultHighValue = value;
  }

  get defaultLowValue() {
    return this._defaultLowValue;
  }

  set defaultLowValue(value) {
    this._defaultLowValue = value;
  }
}