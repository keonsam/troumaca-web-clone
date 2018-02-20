import {AssetKindState} from "./asset.kind.state";
import {AssetTypeState} from "../asset-type/asset.type.state";
//import {AssetTypeClassState} from "../asset-types/asset.type.class.state";
import {UnitOfMeasureState} from "../assets/asset.unit.of.measure.state";
import {AssetPersonState} from "../assets/asset.person.state";
import {SiteState} from "../assets/asset.site.state";
import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class AssetState {

  @JsonProperty("assetId", String)
  private _assetId:string;
  private _tenantId: string;
  private _assetKind: AssetKindState;
  private _serialNumber:string;
  private _description:string;
  private _quantity:number;

  private _unitOfMeasure: UnitOfMeasureState;
  //private _lotNumber:string;
  private _site: SiteState;
  private _person: AssetPersonState;

  //private _assetTypeClass: AssetTypeClassState;
  private _assetType: AssetTypeState;

  private _createdOn: string;
  private _modifiedOn: string;

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

  get assetKind(): AssetKindState {
    return this._assetKind;
  }

  set assetKind(value: AssetKindState) {
    this._assetKind = value;
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

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get unitOfMeasure(): UnitOfMeasureState {
    return this._unitOfMeasure;
  }

  set unitOfMeasure(value: UnitOfMeasureState) {
    this._unitOfMeasure = value;
  }

  /*get lotNumber(): string {
    return this._lotNumber;
  }

  set lotNumber(value: string) {
    this._lotNumber = value;
  }*/

  /*get assetTypeClass(): AssetTypeClassState {
    return this._assetTypeClass;
  }

  set assetTypeClass(value: AssetTypeClassState) {
    this._assetTypeClass = value;
  } */

  get assetType(): AssetTypeState {
    return this._assetType;
  }

  set assetType(value: AssetTypeState) {
    this._assetType = value;
  }
  get person(): AssetPersonState {
    return this._person;
  }

  set person(value: AssetPersonState) {
    this._person = value
  }

  get site(): SiteState {
    return this._site;
  }

  set site(value: SiteState) {
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

  toJson() {
    return {
      assetId: this.assetId,
      tenantId: this.tenantId,
      assetKind: this.assetKind.toJson(),
      assetType: this.assetType,
      serialNumber: this.serialNumber,
      description: this.description,
      quantity: this.quantity,
      unitOfMeasure: this.unitOfMeasure,
      person: this.person,
      //lotNumber: this.lotNumber,
      site: this.site,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
     //assetTypeClass: (this.assetTypeClass ? this.assetTypeClass : "")
    }
  }

}
