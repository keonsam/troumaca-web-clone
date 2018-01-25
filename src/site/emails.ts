import {Email} from "./email";

export class Emails {

  private _emails:Email[] = [];

  get emails(): Email[] {
    return this._emails;
  }

  set emails(value: Email[]) {
    this._emails = value;
  }

}