export class StreetAddresses {

  private _streetAddresses:StreetAddresses[] = [];

  get streetAddresses(): StreetAddresses[] {
    return this._streetAddresses;
  }

  set streetAddresses(value: StreetAddresses[]) {
    this._streetAddresses = value;
  }

}