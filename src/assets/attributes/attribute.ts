export class Attribute {
  private _assetCharacteristicId: string;
  private _assetCharacteristicTypeId: string;
  private _name: string;
  private _list: string[];
  private _description: string;
  private _type: string;
  private _format: string;

  get assetCharacteristicId(): string {
    return this._assetCharacteristicId;
  }

  set assetCharacteristicId(value: string) {
    this._assetCharacteristicId = value;
  }

  get assetCharacteristicTypeId(): string {
    return this._assetCharacteristicTypeId;
  }

  set assetCharacteristicTypeId(value: string) {
    this._assetCharacteristicTypeId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get list(): string[] {
    return this._list;
  }

  set list(value: string[]) {
    this._list = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get format(): string {
    return this._format;
  }

  set format(value: string) {
    this._format = value;
  }
}
