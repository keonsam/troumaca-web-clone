export class AssignedAttribute {

  private _assignedAttributeId: string;
  private _assetTypeClassId: string;
  private _attributeId: string;
  private _attributeName: string;
  private _required: boolean;
  private _createdOn: string;
  private _modifiedOn: string;
  private _dataTypeId: string;
  private _dataTypeName: string;

  constructor(attributeId?: string, attributeName?: string, dataTypeName?: string) {
    this._attributeId = attributeId;
    this.attributeName = attributeName;
    this.dataTypeName = dataTypeName;
  }

  get assignedAttributeId(): string {
    return this._assignedAttributeId;
  }

  set assignedAttributeId(value: string) {
    this._assignedAttributeId = value;
  }

  get assetTypeClassId(): string {
    return this._assetTypeClassId;
  }

  set assetTypeClassId(value: string) {
    this._assetTypeClassId = value;
  }

  get attributeId(): string {
    return this._attributeId;
  }

  set attributeId(value: string) {
    this._attributeId = value;
  }

  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = value;
  }

  get createdOn(): string {
    return this._createdOn;
  }

  set createdOn(value: string) {
    this._createdOn = value;
  }

  get modifiedOn(): string {
    return this._modifiedOn;
  }

  set modifiedOn(value: string) {
    this._modifiedOn = value;
  }

  get attributeName(): string {
    return this._attributeName;
  }

  set attributeName(value: string) {
    this._attributeName = value;
  }

  get dataTypeId(): string {
    return this._dataTypeId;
  }

  set dataTypeId(value: string) {
    this._dataTypeId = value;
  }

  get dataTypeName(): string {
    return this._dataTypeName;
  }

  set dataTypeName(value: string) {
    this._dataTypeName = value;
  }
}
