export class Session {

  private _sessionId:string;
  private _expirationDate:Date;
  private _createdOn:Date;
  private _modifiedOn:Date;
  private _data:Map;


  constructor(sessionId?: string, expirationDate?: Date, createdOn?: Date, modifiedOn?: Date, data?: Map) {
    this._sessionId = sessionId;
    this._expirationDate = expirationDate;
    this._createdOn = createdOn;
    this._modifiedOn = modifiedOn;
    if (data) {
      this._data = data;
    } else {
      this.data = new Map()
    }
  }

  get sessionId(): string {
    return this._sessionId;
  }

  set sessionId(value: string) {
    this._sessionId = value;
  }

  get expirationDate(): Date {
    return this._expirationDate;
  }

  set expirationDate(value: Date) {
    this._expirationDate = value;
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

  get data(): Map {
    return this._data;
  }

  set data(value: Map) {
    this._data = value;
  }
}