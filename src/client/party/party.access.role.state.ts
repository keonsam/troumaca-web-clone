import {AccessRoleState} from "../access-roles/access.role.state";

export class PartyAccessRoleState {
  private _partyAccessRoleId: string;
  private _partyId: string;
  private _accessRoleId: string;
  private _accessRole: AccessRoleState;
  private _effectiveDate: Date;
  private _untilDate: Date;
  private _createdOn: Date;
  private _modifiedOn: Date;

  get partyAccessRoleId(): string {
    return this._partyAccessRoleId;
  }

  set partyAccessRoleId(value: string) {
    this._partyAccessRoleId = value;
  }

  get partyId(): string {
    return this._partyId;
  }

  set partyId(value: string) {
    this._partyId = value;
  }

  get accessRoleId(): string {
    return this._accessRoleId;
  }

  set accessRoleId(value: string) {
    this._accessRoleId = value;
  }

  get accessRole(): AccessRoleState {
    return this._accessRole;
  }

  set accessRole(value: AccessRoleState) {
    this._accessRole = value;
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
  toJson(){
    return {
      partyAccessRoleId: this.partyAccessRoleId,
      partyId: this.partyId,
      accessRoleId: this.accessRoleId,
      effectiveDate: this.effectiveDate,
      untilDate: this.untilDate,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    }
  }
}
