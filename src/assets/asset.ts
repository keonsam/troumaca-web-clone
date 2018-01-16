import {AssetTypeClass} from "../asset-type-classes/asset.type.class";
import {AssetType} from "assets/asset.type";
import {Site} from "./asset.site";
import {Lot} from "./asset.lot";
import {UnitOfMeasure} from "./asset.unit.of.measure";
import {AssetPerson} from "./asset.person";
//import {AssetKind} from "./asset.kind";

export class Asset {

  private _assetId:string;
  private _assetKindId:string;
  private _serialNumber:string;
  private _description:string;
  private _quantity:string;
  private _unitOfMeasure:UnitOfMeasure;
  private _lot:Lot;
  private _person: AssetPerson;

  private _site:Site;
  private _assetTypeClass: AssetTypeClass;
  private _assetType: AssetType;


  constructor() {
    this._unitOfMeasure = new UnitOfMeasure();
    this._assetTypeClass = new AssetTypeClass();
    this._assetType = new AssetType();
    this._lot = new Lot();
    this._person = new AssetPerson();
    this._site = new Site();
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

  get assetType(): AssetType {
    return this._assetType;
  }

  set assetType(value: AssetType) {
    this._assetType = value;
  }

  get lot(): Lot {
    return this._lot;
  }

  set lotId(value: Lot) {
    this._lot = value;
  }

  get person(): AssetPerson {
  return  this._person;
  }

  set person(value: AssetPerson) {
    this._person = value
  }

  get site(): Site {
    return this._site;
  }

  set site(value: Site) {
    this._site = value;
  }

}
