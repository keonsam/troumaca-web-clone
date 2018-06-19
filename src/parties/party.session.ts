export class PartySession {

  private _sessionId: string;
  private _partyId: string;
  private _tennantId: string;
  private _map: Map<string, string> = new Map<string, string>();

  get sessionId(): string {
    return this._sessionId;
  }

  set sessionId(value: string) {
    this._sessionId = value;
  }

  get partyId(): string {
    return this._partyId;
  }

  set partyId(value: string) {
    this._partyId = value;
  }

  get tennantId(): string {
    return this._tennantId;
  }

  set tennantId(value: string) {
    this._tennantId = value;
  }

  // get map(): Map {
  //   return this._map;
  // }

  // set map(value: Map) {
  //   this._map = value;
  // }

}
