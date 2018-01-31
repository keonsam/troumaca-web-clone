export class AttributeState {

  private _attributeId:string;
  private _tenantId:string;
  private _name:string;
  private _format:string;
  // replace with data type
  private _dataType:string;
  // replace with unit of measure
  private _unitOfMeasureId:string;
  private _maximumValue:string;
  private _minimumValue:string;
  private _createdOn:Date;
  private _modifiedOn:Date;

  get attributeId(): string {
    return this._attributeId;
  }

  set attributeId(value: string) {
    this._attributeId = value;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  set tenantId(value: string) {
    this._tenantId = value;
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

  get dataType(): string {
    return this._dataType;
  }

  set dataType(value: string) {
    this._dataType = value;
  }

  get unitOfMeasureId(): string {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: string) {
    this._unitOfMeasureId = value;
  }

  get maximumValue(): string {
    return this._maximumValue;
  }

  set maximumValue(value: string) {
    this._maximumValue = value;
  }

  get minimumValue(): string {
    return this._minimumValue;
  }

  set minimumValue(value: string) {
    this._minimumValue = value;
  }

  get createdOn(): Date {
    return this._createdOn;
  }

  set createdOn(value: Date) {
    this._createdOn = value;
  }

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  set modifiedOn(value: Date) {
    this._modifiedOn = value;
  }


  toJson() {
    return {
      attributeId: this.attributeId,
      tenantId: this.tenantId,
      name: this.name,
      format: this.format,
      dataType: this.dataType,
      unitOfMeasureId: this.unitOfMeasureId,
      maximumValue: this.maximumValue,
      minimumValue: this.minimumValue,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    }
  }

}
