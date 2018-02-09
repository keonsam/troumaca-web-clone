export class Party {

  private _partyId:string;
  private _name:string;
  private _createdOn:Date;

  get partyId(): string {
    return this._partyId;
  }

  set partyId(value: string) {
    this._partyId = value;
  }

  get  name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get createdOn(): Date {
    return this._createdOn;
  }

  set createdOn(value: Date) {
    this._createdOn = value;
  }
}