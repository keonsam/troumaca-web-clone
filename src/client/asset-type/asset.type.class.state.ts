import {AttributeState} from './attribute.state';

export class AssetTypeClassState {

  private _assetTypeClassId: string;
  private _name: string;
  private _description: string;
  private _attributes: AttributeState[];

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

  get attributes(): AttributeState[] {
    return this._attributes;
  }

  set attributes(value: AttributeState[]) {
    this._attributes = value;
  }

  toJson() {
    return {
      assetTypeClassId: this.assetTypeClassId,
      name: this.name,
      description: this.description,
      attributes: this.attributes
    }
  }

}
