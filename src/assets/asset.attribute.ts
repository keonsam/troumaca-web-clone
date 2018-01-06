export class AssetAttribute {

  private _attributeAssignmentId:string;
  private _valueId:string;
  private _value:string;
  private _attributeId:string;
  private _name:string;
  private _format:string;
  private _unitOfMeasure:string;
  private _defaultHighValue;
  private _defaultLowValue;

  get attributeAssignmentId(): string {
    return this._attributeAssignmentId;
  }

  set attributeAssignmentId(value: string) {
    this._attributeAssignmentId = value;
  }

  get valueId(): string {
    return this._valueId;
  }

  set valueId(value: string) {
    this._valueId = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get attributeId(): string {
    return this._attributeId;
  }

  set attributeId(value: string) {
    this._attributeId = value;
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