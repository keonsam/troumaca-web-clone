import {AssetAttribute} from "./asset.attribute";

export class AssetTypeClasses {

  private _assetTypeClassId:string;
  private _name:string;
  private _description:string;
  private _attributeAssignmentId:string;
  private _attributes:AssetAttribute;

  get assetTypeClassId(): string {
    return this._assetTypeClassId;
  }

  set assetTypeClassId(value: string) {
    this._assetTypeClassId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get attributeAssignmentId(): string {
    return this._attributeAssignmentId;
  }

  set attributeAssignmentId(value: string) {
    this._attributeAssignmentId = value;
  }

  get attributes(): AssetAttribute {
    return this._attributes;
  }

  set attributes(value: AssetAttribute) {
    this._attributes = value;
  }
}