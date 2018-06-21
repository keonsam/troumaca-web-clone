import {Party} from './party';

export class Credential extends Party {

  private _credentialId: string;
  private _username: string;
  private _password: string;
  private _confirmPassword: string;

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


}
