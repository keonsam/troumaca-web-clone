import {EmailState} from "./email.state";

export class EmailStates {

  private _emails:EmailState[] = [];

  get emails(): EmailState[] {
    return this._emails;
  }

  set emails(value: EmailState[]) {
    this._emails = value;
  }
}