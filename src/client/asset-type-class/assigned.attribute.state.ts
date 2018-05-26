import {AttributeState} from "../attribute/attribute.state";

export class AssignedAttributeState {

  private _assignedAttributeId:string;
  private _assetTypeClassId: string;
  private _attributeId: string;
  private _attribute: AttributeState;
  private _required: boolean;
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

  get attributeId(): string {
    return this._attributeId;
  }

  set attributeId(value: string) {
    this._attributeId = value;
  }
  
  get attribute(): AttributeState {
    return this._attribute;
  }

  set attribute(value: AttributeState) {
    this._attribute = value;
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

  toJson() {
    return {
      assignedAttributeId: this.assignedAttributeId,
      assetTypeClassId: this.assetTypeClassId,
      attributeId: this.attributeId,
      required: this.required,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    }
  }
}
