export class AssetTypeStructureState {

  private _assetTypeStructureId:string;
  private _quantityPer:number;
  private _effectiveDate:Date;
  private _untilDate:Date;

  get assetTypeStructureId(): string {
    return this._assetTypeStructureId;
  }

  set assetTypeStructureId(value: string) {
    this._assetTypeStructureId = value;
  }

  get quantityPer(): number {
    return this._quantityPer;
  }

  set quantityPer(value: number) {
    this._quantityPer = value;
  }

  get effectiveDate(): Date {
    return this._effectiveDate;
  }

  set effectiveDate(value: Date) {
    this._effectiveDate = value;
  }

  get untilDate(): Date {
    return this._untilDate;
  }

  set untilDate(value: Date) {
    this._untilDate = value;
  }
}