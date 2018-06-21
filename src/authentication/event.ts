
export class Event {

  private _partyId: string;
  private _timestamp: number;
  private _source: string;
  private _name: string;
  private _data: Object;

  constructor(partyId?: string, timestamp?: number, source?: string, name?: string) {
    this._partyId = partyId;
    this._timestamp = timestamp;
    this._source = source;
    this._name = name;
  }

  get data(): Object {
    return this._data;
  }

  set data(value: Object) {
    this._data = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get source(): string {
    return this._source;
  }

  set source(value: string) {
    this._source = value;
  }
  get timestamp(): number {
    return this._timestamp;
  }

  set timestamp(value: number) {
    this._timestamp = value;
  }
  get partyId(): string {
    return this._partyId;
  }

  set partyId(value: string) {
    this._partyId = value;
  }

}
