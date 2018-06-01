import {ResourceTypeState} from "./resource.type.state";

export class ResourceState {

  private _resourceId:string;
  private _resourceTypeId: string;
  private _resourceType: ResourceTypeState;
  private _name:string;
  private _description:string;
  private _ownerPartyId:string;
  private _createdOn:Date;
  private _modifiedOn:Date;

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

  get resourceType(): ResourceTypeState {
    return this._resourceType;
  }

  set resourceType(value: ResourceTypeState) {
    this._resourceType = value;
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

  get ownerPartyId(): string {
    return this._ownerPartyId;
  }

  set ownerPartyId(value: string) {
    this._ownerPartyId = value;
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
      ownerPartyId: this.ownerPartyId,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    }
  }

}