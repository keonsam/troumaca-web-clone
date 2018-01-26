import {StreetAddressState} from "./street.address.state";

export class StreetAddressStates {

  private _streetAddresses:StreetAddressState[] = [];

  get streetAddresses(): StreetAddressState[] {
    return this._streetAddresses;
  }

  set streetAddresses(value: StreetAddressState[]) {
    this._streetAddresses = value;
  }

}