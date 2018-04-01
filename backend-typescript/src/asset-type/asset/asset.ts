import {AssetKind} from "../kind/asset.kind";
import {AssetType} from "../asset.type";

export class Asset {

  private _assetId:string;
  private _tenantId:string;
  private _assetKind: AssetKind;
  private _assetType: AssetType;
  private _serialNumber:string;
  private _quantity:string;
  private _unitOfMeasureId:string;
  private _description:string;
  private _personId: string;
  private _siteId: string;
  private _createdOn: string;
  private _modifiedOn: string;


  constructor() {
    this._assetKind = new AssetKind();
    this._assetType = new AssetType();
  }

  get assetId(): string {
    return this._assetId;
  }

  set assetId(value: string) {
    this._assetId = value;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  set tenantId(value: string) {
    this._tenantId = value;
  }

  get assetKind(): AssetKind {
    return this._assetKind;
  }

  set assetKind(value: AssetKind) {
    this._assetKind = value;
  }

  get assetType(): AssetType {
    return this._assetType;
  }

  set assetType(value: AssetType) {
    this._assetType = value;
  }

  get serialNumber(): string {
    return this._serialNumber;
  }

  set serialNumber(value: string) {
    this._serialNumber = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get quantity(): string {
    return this._quantity;
  }

  set quantity(value: string) {
    this._quantity = value;
  }

  get unitOfMeasureId(): string {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: string) {
    this._unitOfMeasureId = value;
  }

  get personId(): string {
    return  this._personId;
  }

  set personId(value: string) {
    this._personId = value
  }

  get siteId(): string {
    return this._siteId;
  }

  set siteId(value: string) {
    this._siteId = value;
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
