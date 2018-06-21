export class CredentialConfirmationState {

  private _credentialConfirmationId: string;
  private _credentialId: string;
  private _confirmationCode: string;
  private _credentialStatus: string;
  private _createdOn: Date;
  private _modifiedOn: Date;

  constructor(credentialConfirmationId?: string, credentialId?: string, credentialCode?: string, createdOn?: Date, modifiedOn?: Date) {
    this._credentialConfirmationId = credentialConfirmationId;
    this._credentialId = credentialId;
    this._confirmationCode = credentialCode;
    this._createdOn = createdOn;
    this._modifiedOn = modifiedOn;
  }

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

  get credentialStatus(): string {
    return this._credentialStatus;
  }

  set credentialStatus(value: string) {
    this._credentialStatus = value;
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

  toJson() {
    return {
      credentialConfirmationId: this.credentialConfirmationId,
      credentialId: this.credentialId,
      confirmationCode: this.confirmationCode,
      credentialStatus: this.credentialStatus,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    }
  }

}
