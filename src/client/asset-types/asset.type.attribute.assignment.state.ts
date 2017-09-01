export class AssetTypeAttributeAssignmentState {

  private _assetTypeAttributeAssignmentId:string;
  private _assetTypeClassId:string;
  private _assetTypeAttributeId:string;
  private _highValue:string;
  private _lowValue:string;


  get assetTypeAttributeAssignmentId(): string {
    return this._assetTypeAttributeAssignmentId;
  }

  set assetTypeAttributeAssignmentId(value: string) {
    this._assetTypeAttributeAssignmentId = value;
  }

  get assetTypeClassId(): string {
    return this._assetTypeClassId;
  }

  set assetTypeClassId(value: string) {
    this._assetTypeClassId = value;
  }

  get assetTypeAttributeId(): string {
    return this._assetTypeAttributeId;
  }

  set assetTypeAttributeId(value: string) {
    this._assetTypeAttributeId = value;
  }

  get highValue(): string {
    return this._highValue;
  }

  set highValue(value: string) {
    this._highValue = value;
  }

  get lowValue(): string {
    return this._lowValue;
  }

  set lowValue(value: string) {
    this._lowValue = value;
  }
}