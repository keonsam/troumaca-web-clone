export class AssetTypeAttributeValueState {

  private _assetTypeAttributeValueId:string;
  private _assetTypeId:string;
  private _assetTypeAttributeId:string;
  private _value:string;
  private _price:number;


  get assetTypeAttributeValueId(): string {
    return this._assetTypeAttributeValueId;
  }

  set assetTypeAttributeValueId(value: string) {
    this._assetTypeAttributeValueId = value;
  }

  get assetTypeId(): string {
    return this._assetTypeId;
  }

  set assetTypeId(value: string) {
    this._assetTypeId = value;
  }

  get assetTypeAttributeId(): string {
    return this._assetTypeAttributeId;
  }

  set assetTypeAttributeId(value: string) {
    this._assetTypeAttributeId = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

}