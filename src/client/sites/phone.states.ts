import {PhoneState} from "./phone.state";

export class PhoneStates {

  private _phones:PhoneState[] = [];

  get phones(): PhoneState[] {
    return this._phones;
  }

  set phones(value: PhoneState[]) {
    this._phones = value;
  }

}