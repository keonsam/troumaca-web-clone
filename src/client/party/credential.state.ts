import {PartyState} from './party.state';

export class CredentialState extends PartyState {

  private _credentialId: string;
  private _username: string;
  private _password: string;


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

  toJson() {
    return {
      partyId: this.partyId,
      credentialId: this.credentialId,
      username: this.username,
      password: this.password,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    }
  }

}
