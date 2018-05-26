import {PermissionState} from "./permission.state";

export class ResourcePermissionState {

  private _resourcePermissionId:string;
  private _resourceId:string;
  private _permission:PermissionState;
  //private _ownerPartyId:string;
  private _createdOn:Date;
  private _modifiedOn:Date;

  get resourcePermissionId(): string {
    return this._resourcePermissionId;
  }

  set resourcePermissionId(value: string) {
    this._resourcePermissionId = value;
  }

  get resourceId(): string {
    return this._resourceId;
  }

  set resourceId(value: string) {
    this._resourceId = value;
  }

  get permission(): PermissionState {
    return this._permission;
  }

  set permission(value: PermissionState) {
    this._permission = value;
  }

// get ownerPartyId(): string {
  //   return this._ownerPartyId;
  // }
  //
  // set ownerPartyId(value: string) {
  //   this._ownerPartyId = value;
  // }

  get createdOn(): Date {
    return this._createdOn;
  }

  set createdOn(value: Date) {
    this._createdOn = value;
  }

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  set modifiedOn(value: Date) {
    this._modifiedOn = value;
  }

  toJson() {
    return {
      resourcePermissionId: this.resourcePermissionId,
      resourceId: this.resourceId,
      permission: {name: this.permission.name, permissionId: this.permission.permissionId},
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    }
  }

}
