export class ValidateResponse {

  private _valid;

  constructor(valid?:boolean) {
    this._valid = valid;
  }

  get valid() {
    return this._valid;
  }

  set valid(value) {
    this._valid = value;
  }
}