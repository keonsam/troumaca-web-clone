import {CredentialStatus} from "./credential.status";

export class Credential {

  private _credentialId:string;
  private _username:string;
  private _password:string;
  private _credentialStatus:CredentialStatus;
  private _modifiedOn:Date;
  private _createdOn:Date;

  get credentialId(): string {
    return this._credentialId;
  }

  set credentialId(value: string) {
    this._credentialId = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get credentialStatus(): CredentialStatus {
    return this._credentialStatus;
  }

  set credentialStatus(value: CredentialStatus) {
    this._credentialStatus = value;
  }

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  set modifiedOn(value: Date) {
    this._modifiedOn = value;
  }

  get createdOn(): Date {
    return this._createdOn;
  }

  set createdOn(value: Date) {
    this._createdOn = value;
  }

}