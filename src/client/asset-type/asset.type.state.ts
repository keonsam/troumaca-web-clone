import {AssetTypeClassState} from '../asset-type-class/asset.type.class.state';
// import {AttributeState} from "./attribute.state";
import {UnitOfMeasureState} from '../unit-of-measure/unit.of.measure.state';

export class AssetTypeState {

  private _assetTypeId: string;
  private _assetTypeClassId: string;
  private _unitOfMeasureId: string;
  private _modelNumber: string;
  private _description: string;
  private _name: string;
  private _materialCode: string;
  private _unitOfMeasure: UnitOfMeasureState;
  private _assetTypeClass: AssetTypeClassState;

  get assetTypeId(): string {
    return this._assetTypeId;
  }

  set assetTypeId(value: string) {
    this._assetTypeId = value;
  }

  get assetTypeClassId(): string {
    return this._assetTypeClassId;
  }

  set assetTypeClassId(value: string) {
    this._assetTypeClassId = value;
  }

  get unitOfMeasureId(): string {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: string) {
    this._unitOfMeasureId = value;
  }

  get assetTypeClass(): AssetTypeClassState {
    return this._assetTypeClass;
  }

  set assetTypeClass(value: AssetTypeClassState) {
    this._assetTypeClass = value;
  }

  // get attributes(): AttributeState[] {
  //   return this._attributes;
  // }
  //
  // set attributes(value: AttributeState[]) {
  //   this._attributes = value;
  // }

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

  get unitOfMeasure(): UnitOfMeasureState {
    return this._unitOfMeasure;
  }

  set unitOfMeasure(value: UnitOfMeasureState) {
    this._unitOfMeasure = value;
  }

  toJson() {
    return {
      assetTypeId: this.assetTypeId,
      assetTypeClassId: this.assetTypeClassId,
      unitOfMeasureId: this.unitOfMeasureId,
      name: this.name,
      description: this.description,
      modelNumber: this.modelNumber,
      materialCode: this.materialCode,
    }
  }

}
