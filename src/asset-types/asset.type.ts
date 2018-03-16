import {AssetTypeClass} from "../asset-type-classes/asset.type.class";
import {UnitOfMeasure} from "../unit-of-measure/unit.of.measure";

export class AssetType {

  private _assetTypeId:string;
  private _modelNumber:string;
  private _description:string;
  private _name:string;
  private _materialCode:string;
  private _unitOfMeasure: UnitOfMeasure;
  private _assetTypeClass:AssetTypeClass;

  constructor() {
    this._assetTypeClass = new AssetTypeClass();

  }

  get assetTypeId(): string {
    return this._assetTypeId;
  }

  set assetTypeId(value: string) {
    this._assetTypeId = value;
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

  get unitOfMeasure(): UnitOfMeasure {
    return this._unitOfMeasure;
  }

  set unitOfMeasure(value: UnitOfMeasure) {
    this._unitOfMeasure = value;
  }

  get assetTypeClass(): AssetTypeClass {
    return this._assetTypeClass;
  }


  set assetTypeClass(value: AssetTypeClass) {
    this._assetTypeClass = value;
  }

}
