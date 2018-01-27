import {AssetTypeState} from "../asset-types/asset.type.state";
import {AssetTypeClassState} from "../asset-types/asset.type.class.state";
import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class AssetState {

  @JsonProperty("assetId", String)
  private _assetId:string;
  private _assetKindId: string;
  private _serialNumber:string;
  private _description:string;
  private _quantity:number;
  private _unitOfMeasure:string;
  private _lotNumber:string;
  private _site: string;
  private _person: string;

  private _assetTypeClass: AssetTypeClassState;
  private _assetType: AssetTypeState;

  get assetId(): string {
    return this._assetId;
  }

  set assetId(value: string) {
    this._assetId = value;
  }
  get assetKindId(): string {
    return this._assetKindId;
  }

  set assetKindId(value: string){
     this._assetKindId = value
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

  get unitOfMeasure(): string {
    return this._unitOfMeasure;
  }

  set unitOfMeasure(value: string) {
    this._unitOfMeasure = value;
  }

  get lotNumber(): string {
    return this._lotNumber;
  }

  set lotNumber(value: string) {
    this._lotNumber = value;
  }

  get assetTypeClass(): AssetTypeClassState {
    return this._assetTypeClass;
  }

  set assetTypeClass(value: AssetTypeClassState) {
    this._assetTypeClass = value;
  }

  get assetType(): AssetTypeState {
    return this._assetType;
  }

  set assetType(value: AssetTypeState) {
    this._assetType = value;
  }
  get person(): string {
    return this._person;
  }

  set person(value: string) {
    this._person = value
  }

  get site(): string {
    return this._site;
  }

  set site(value: string) {
    this._site = value;
  }

  toJson() {
    return {
      assetId: this.assetId,
      assetKindId: this.assetKindId,
      serialNumber: this.serialNumber,
      description: this.description,
      quantity: this.quantity,
      unitOfMeasure: this.unitOfMeasure,
      lotNumber: this.lotNumber,
      site: this.site,
      assetTypeClass: (this.assetTypeClass ? this.assetTypeClass : "")
    }
  }

}
