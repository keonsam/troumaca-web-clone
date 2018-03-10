
export class CredentialConfirmation {

  private _credentialConfirmationId:string;
  private _credentialId:string;
  private _confirmationCode:string;
  private _status: string;
  private _createdOn:Date;
  private _modifiedOn:Date;

  get credentialConfirmationId(): string {
    return this._credentialConfirmationId;
  }

  set credentialConfirmationId(value: string) {
    this._credentialConfirmationId = value;
  }

  get credentialId(): string {
    return this._credentialId;
  }

  set credentialId(value: string) {
    this._credentialId = value;
  }

  get confirmationCode(): string {
    return this._confirmationCode;
  }

  set confirmationCode(value: string) {
    this._confirmationCode = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
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

}
