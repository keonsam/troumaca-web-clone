import {AssetTypeClassState} from "./asset.type.class.state";
import {AssignedAttributeState} from "./assigned.attribute.state";

export class AssetTypeClassResponseState {

  private _created:boolean;
  private _assetTypeClass: AssetTypeClassState;
  private _assignedAttributes: AssignedAttributeState;

  get created(): boolean {
    return this._created;
  }

  set created(value: boolean) {
    this._created = value;
  }

  get assetTypeClass(): AssetTypeClassState {
    return this._assetTypeClass;
  }

  set assetTypeClass(value: AssetTypeClassState) {
    this._assetTypeClass = value;
  }

  get assignedAttributes(): AssignedAttributeState {
    return this._assignedAttributes;
  }

  set assignedAttributes(value: AssignedAttributeState) {
    this._assignedAttributes = value;
  }
}
