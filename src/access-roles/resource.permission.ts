export class ResourcePermission {

  private _resourcePermissionId:string;
  private _resourceId:string;
  private _permissionId:string;
  //private _ownerPartyId:string;
  private _createdOn:Date;
  private _modifiedOn:Date;

  constructor(permissionId?: string) {
    this._permissionId = permissionId;
  }

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

  get permissionId(): string {
    return this._permissionId;
  }

  set permissionId(value: string) {
    this._permissionId = value;
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

}
