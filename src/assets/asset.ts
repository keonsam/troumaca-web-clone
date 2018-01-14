import {AssetTypeClass} from "../asset-type-classes/asset.type.class";
import {AssetType} from "assets/asset.type";

export class Asset {

  private _assetId:string;
  private _assetKindId:string;
  private _serialNumber:string;
  private _description:string;
  private _quantity:string;
  private _unitOfMeasureId:string;
  // Todo: Remove
  private _lotNumber:string;
  private _lotId:string;
  private _siteId:string;

  private _assetTypeClass: AssetTypeClass;
  private _assetType: AssetType;


  constructor(assetId?: string, assetKindId?:string, serialNumber?: string, description?: string, quantity?: string,
              unitOfMeasureId?: string, assetTypeClass?: AssetTypeClass, assetType?: AssetType) {
    this._assetId = assetId;
    this._assetKindId = assetKindId;
    this._serialNumber = serialNumber;
    this._description = description;
    this._quantity = quantity;
    this._unitOfMeasureId = unitOfMeasureId;
    this._assetTypeClass = assetTypeClass;
    this._assetType = assetType;
  }

  get assetId(): string {
    return this._assetId;
  }

  set assetId(value: string) {
    this._assetId = value;
  }

  get assetKindId(): string {
    return this._assetKindId;
  }

  set assetKindId(value: string) {
    this._assetKindId = value;
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

  get lotNumber(): string {
    return this._lotNumber;
  }

  set lotNumber(value: string) {
    this._lotNumber = value;
  }

  get assetTypeClass(): AssetTypeClass {
    return this._assetTypeClass;
  }

  set assetTypeClass(value: AssetTypeClass) {
    this._assetTypeClass = value;
  }

  get assetType(): AssetType {
    return this._assetType;
  }

  set assetType(value: AssetType) {
    this._assetType = value;
  }

  get lotId(): string {
    return this._lotId;
  }

  set lotId(value: string) {
    this._lotId = value;
  }

  get siteId(): string {
    return this._siteId;
  }

  set siteId(value: string) {
    this._siteId = value;
  }

}