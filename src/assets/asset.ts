//import {AssetTypeClass} from "../asset-type-classes/asset.type.class";
import {AssetKind} from './asset.kind';
import {AssetType} from '../asset-types/asset.type';
import {Site} from './asset.site';
import {Lot} from './asset.lot';
import {UnitOfMeasure} from '../unit-of-measure/unit.of.measure';
import {AssetPerson} from './asset.person';
//import {AssetKind} from "./asset.kind";

export class Asset {

  private _assetId: string;
  private _tenantId: string;
  private _assetKindId: string;
  private _assetKind: AssetKind;
  private _assetTypeId: string;
  private _assetType: AssetType;
  private _serialNumber: string;
  private _quantity: string;
  private _unitOfMeasureId: string;
  private _unitOfMeasure: UnitOfMeasure;
  private _description: string;
  private _personId: string;
  private _person: AssetPerson;
  private _siteId: string;
  private _site: Site;
  //private _lot:Lot;
  //private _assetTypeClass: AssetTypeClass;
  private _createdOn: string;
  private _modifiedOn: string;


  constructor() {
    this._assetKind = new AssetKind();
    this._assetType = new AssetType();
    this._unitOfMeasure = new UnitOfMeasure();
    //this._assetTypeClass = new AssetTypeClass();
    //this._lot = new Lot();
    this._person = new AssetPerson();
    this._site = new Site();
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

  get assetKindId(): string {
    return this._assetKindId;
  }

  set assetKindId(value: string) {
    this._assetKindId = value;
  }

  get assetKind(): AssetKind {
    return this._assetKind;
  }

  set assetKind(value: AssetKind) {
    this._assetKind = value;
  }

  get assetTypeId(): string {
    return this._assetTypeId;
  }

  set assetTypeId(value: string) {
    this._assetTypeId = value;
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

  get unitOfMeasure(): UnitOfMeasure {
    return this._unitOfMeasure;
  }

  set unitOfMeasure(value: UnitOfMeasure) {
    this._unitOfMeasure = value;
  }

  /*get assetTypeClass(): AssetTypeClass {
    return this._assetTypeClass;
  }

  set assetTypeClass(value: AssetTypeClass) {
    this._assetTypeClass = value;
  } */

  /*get lot(): Lot {
    return this._lot;
  }

  set lotId(value: Lot) {
    this._lot = value;
  }*/

  get personId(): string {
    return this._personId;
  }

  set personId(value: string) {
    this._personId = value;
  }

  get person(): AssetPerson {
  return  this._person;
  }

  set person(value: AssetPerson) {
    this._person = value
  }

  get siteId(): string {
    return this._siteId;
  }

  set siteId(value: string) {
    this._siteId = value;
  }

  get site(): Site {
    return this._site;
  }

  set site(value: Site) {
    this._site = value;
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
