import {ResourcePermissionState} from "./resource.permission.state";

export class ResourceState {

  private _resourceId: string;
  private _resourceTypeId: string;
  private _name: string;
  private _description: string;
  private _resourceTypeName: string;
  private _resourcePermissions: ResourcePermissionState[];
  private _createdOn: Date;
  private _modifiedOn: Date;

  get resourceId(): string {
    return this._resourceId;
  }

  set resourceId(value: string) {
    this._resourceId = value;
  }

  get resourceTypeId(): string {
    return this._resourceTypeId;
  }

  set resourceTypeId(value: string) {
    this._resourceTypeId = value;
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

  get resourceTypeName(): string {
    return this._resourceTypeName;
  }

  set resourceTypeName(value: string) {
    this._resourceTypeName = value;
  }

  get resourcePermissions(): ResourcePermissionState[] {
    return this._resourcePermissions;
  }

  set resourcePermissions(value: ResourcePermissionState[]) {
    this._resourcePermissions = value;
  }

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
      resourceId: this.resourceId,
      resourceTypeId: this.resourceTypeId,
      name: this.name,
      description: this.description,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    }
  }

}
