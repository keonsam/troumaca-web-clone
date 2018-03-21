export class AssignedAttribute {

  private _assignedAttributeId:string;
  private _assetTypeClassId: string;
  private _attribute: any[];
  private _createdOn: string;
  private _modifiedOn: string;


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

  get attribute(): any[] {
    return this._attribute;
  }

  set attribute(value: any[]) {
    this._attribute = value;
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
}
