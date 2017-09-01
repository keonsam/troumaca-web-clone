
import {AssetTypeClassModel} from "./asset.type.class.model";
import {AssetTypeAttributeModel} from "./asset.type.attribute.model";
import {AssetTypeAttributeValueModel} from "./asset.type.attribute.value.model";

export class AssetTypeModel {

  private _assetTypeId:string;
  private _assetTypeClass:AssetTypeClassModel;
  private _assetTypeAttributes:AssetTypeAttributeModel[];
  private _assetTypeAttributeValues:AssetTypeAttributeValueModel[];
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

  get assetTypeClass(): AssetTypeClassModel {
    return this._assetTypeClass;
  }

  set assetTypeClass(value: AssetTypeClassModel) {
    this._assetTypeClass = value;
  }

  get assetTypeAttributes(): AssetTypeAttributeModel[] {
    return this._assetTypeAttributes;
  }

  set assetTypeAttributes(value: AssetTypeAttributeModel[]) {
    this._assetTypeAttributes = value;
  }

  get assetTypeAttributeValues(): AssetTypeAttributeValueModel[] {
    return this._assetTypeAttributeValues;
  }

  set assetTypeAttributeValues(value: AssetTypeAttributeValueModel[]) {
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