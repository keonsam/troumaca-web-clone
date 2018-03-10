export class Session {

  private _sessionId:string;
  private _partyId:string;
  private _accountStatus: string;
  private _credentialConfirmationId: string;
  private _created:Date;
  private _modified:Date;
  private _data:Map<string, Object>;

  get data(): Map<string, Object> {
    return this._data;
  }

  set data(value: Map<string, Object>) {
    this._data = value;
  }
  get modified(): Date {
    return this._modified;
  }

  set modified(value: Date) {
    this._modified = value;
  }
  get created(): Date {
    return this._created;
  }

  set created(value: Date) {
    this._created = value;
  }
  get partyId(): string {
    return this._partyId;
  }

  set partyId(value: string) {
    this._partyId = value;
  }
  get sessionId(): string {
    return this._sessionId;
  }

  set sessionId(value: string) {
    this._sessionId = value;
  }

  get accountStatus(): string {
    return this._accountStatus;
  }

  set accountStatus(value: string) {
    this._accountStatus = value;
  }

  get credentialConfirmationId(): string {
    return this._credentialConfirmationId;
  }

  set credentialConfirmationId(value: string) {
    this._credentialConfirmationId = value;
  }

}
