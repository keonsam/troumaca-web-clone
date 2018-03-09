import {PartyState} from "./party.state";

export class AccountState extends PartyState {

  private _accountType: string;
  private _firstName: string;
  private _middleName: string;
  private _lastName: string;
  private _purpose: string;
  private _organizationName: string;
  private _description: string;

  get accountType(): string {
    return this._accountType;
  }

  set accountType(value: string) {
      this._accountType = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get middleName(): string {
    return this._middleName;
  }

  set middleName(value: string) {
    this._middleName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get purpose(): string {
    return this._purpose;
  }

  set purpose(value: string) {
    this._purpose = value;
  }

  get organizationName(): string {
    return this._organizationName;
  }

  set organizationName(value: string) {
    this._organizationName = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  toJson() {
    return {
      partyId: this.partyId,
      accountType: this.accountType,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      purpose: this.purpose,
      organizationName: this.organizationName,
      description: this.description,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    }
  }

}
