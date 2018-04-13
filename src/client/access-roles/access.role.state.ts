import {AccessRoleTypeState} from "./access.role.type.state";

export class AccessRoleState {

  private _accessRoleId:string;
  private _name:string;
  private _accessRoleType: AccessRoleTypeState;
  private _prohibitionIndicator: boolean;
  private _effectiveDate: Date;
  private _untilDate: Date;
  private _description:string;
  private _ownerPartyId:string;
  private _createdOn:Date;
  private _modifiedOn:Date;

  get accessRoleId(): string {
    return this._accessRoleId;
  }

  set accessRoleId(value: string) {
    this._accessRoleId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get accessRoleType(): AccessRoleTypeState {
    return this._accessRoleType;
  }

  set accessRoleType(value: AccessRoleTypeState) {
    this._accessRoleType = value;
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

  get prohibitionIndicator(): boolean {
    return this._prohibitionIndicator;
  }

  set prohibitionIndicator(value: boolean) {
    this._prohibitionIndicator = value;
  }

  get effectiveDate(): Date {
    return this._effectiveDate;
  }

  set effectiveDate(value: Date) {
    this._effectiveDate = value;
  }

  get untilDate(): Date {
    return this._untilDate;
  }

  set untilDate(value: Date) {
    this._untilDate = value;
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
      accessRoleId: this.accessRoleId,
      name: this.name,
      accessRoleType: this.accessRoleType,
      description: this.description,
      ownerPartyId: this.ownerPartyId,
      prohibitionIndicator: this.prohibitionIndicator,
      effectiveDate: this.effectiveDate,
      untilDate: this.untilDate,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    }
  }

}
