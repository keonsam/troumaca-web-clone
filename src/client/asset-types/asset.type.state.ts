import {AssetTypeClassState} from "./asset.type.class.state";
import {AssetTypeAttributeState} from "./asset.type.attribute.state";
import {AssetTypeAttributeValueState} from "./asset.type.attribute.value.state";

export class AssetTypeState {

  private _assetTypeId:string;
  private _assetTypeClass:AssetTypeClassState;
  private _assetTypeAttributes:AssetTypeAttributeState[];
  private _assetTypeAttributeValues:AssetTypeAttributeValueState[];
  private _modelNumber:string;
  private _description:string;
  private _name:string;
  private _materialCode:string;
  private _unitOfMeasure:string;

  get assetTypeId(): string {
    return this._assetTypeId;
  }

  set assetTypeId(value: string) {
    this._assetTypeId = value;
  }

  get assetTypeClass(): AssetTypeClassState {
    return this._assetTypeClass;
  }

  set assetTypeClass(value: AssetTypeClassState) {
    this._assetTypeClass = value;
  }

  get assetTypeAttributes(): AssetTypeAttributeState[] {
    return this._assetTypeAttributes;
  }

  set assetTypeAttributes(value: AssetTypeAttributeState[]) {
    this._assetTypeAttributes = value;
  }

  get assetTypeAttributeValues(): AssetTypeAttributeValueState[] {
    return this._assetTypeAttributeValues;
  }

  set assetTypeAttributeValues(value: AssetTypeAttributeValueState[]) {
    this._assetTypeAttributeValues = value;
  }

  get modelNumber(): string {
    return this._modelNumber;
  }

  set modelNumber(value: string) {
    this._modelNumber = value;
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

  get materialCode(): string {
    return this._materialCode;
  }

  set materialCode(value: string) {
    this._materialCode = value;
  }

  get unitOfMeasure(): string {
    return this._unitOfMeasure;
  }

  set unitOfMeasure(value: string) {
    this._unitOfMeasure = value;
  }

}