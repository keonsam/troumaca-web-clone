import {AssetTypeClass} from './asset.type.class';
import {AssignedAttribute} from './assigned.attribute';

export class AssetTypeClassResponse {

  private _created: boolean;
  private _assetTypeClass: AssetTypeClass;
  private _assignedAttributes: AssignedAttribute[];

  get created(): boolean {
    return this._created;
  }

  set created(value: boolean) {
    this._created = value;
  }

  get assetTypeClass(): AssetTypeClass {
    return this._assetTypeClass;
  }

  set assetTypeClass(value: AssetTypeClass) {
    this._assetTypeClass = value;
  }

  get assignedAttributes(): AssignedAttribute[] {
    return this._assignedAttributes;
  }

  set assignedAttributes(value: AssignedAttribute[]) {
    this._assignedAttributes = value;
  }
}
