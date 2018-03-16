export class CredentialConfirmation {

  private _credentialConfirmationId:string;
  private _confirmationCode:string;

  get credentialConfirmationId(): string {
    return this._credentialConfirmationId;
  }

  set credentialConfirmationId(value: string) {
    this._credentialConfirmationId = value;
  }

  get confirmationCode(): string {
    return this._confirmationCode;
  }

  set confirmationCode(value: string) {
    this._confirmationCode = value;
  }
}