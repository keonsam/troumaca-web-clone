import {AssetTypeClasses} from './asset.type.classes';

export class AssetType {

  private _assetTypeId: string;
  private _modelNumber: string;
  private _description: string;
  private _name: string;
  private _materialCode: string;
  private _unitOfMeasureId: string;
  private _assetTypeClass: AssetTypeClasses;

  constructor() {
    this._assetTypeClass = new AssetTypeClasses();

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

  get unitOfMeasureId(): string {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: string) {
    this._unitOfMeasureId = value;
  }

  get assetTypeClass(): AssetTypeClasses {
    return this._assetTypeClass;
  }


  set assetTypeClass(value: AssetTypeClasses) {
    this._assetTypeClass = value;
  }

}
