export class AssetTypeClassState {

  private _assetTypeClassId:string;
  private _name:string;
  private _description:string;

  constructor(assetTypeClassId?: string, name?:string, description?: string){
    this._assetTypeClassId = assetTypeClassId;
    this._name = name;
    this._description = description;
  }
  
  get assetTypeClassId(): string {
    return this._assetTypeClassId;
  }

  set assetTypeClassId(value: string) {
    this._assetTypeClassId = value;
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

}
