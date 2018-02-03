export class Party {

  private _partyId:string;

  get partyId(): string {
    return this._partyId;
  }

  set partyId(value: string) {
    this._partyId = value;
  }

}