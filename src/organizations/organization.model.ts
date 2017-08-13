export class OrganizationModel {

  private _partyId:string;
  private _name:string;
  private _purpose:string;

  get partyId(): string {
    return this._partyId;
  }

  set partyId(value: string) {
    this._partyId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get purpose(): string {
    return this._purpose;
  }

  set purpose(value: string) {
    this._purpose = value;
  }
}