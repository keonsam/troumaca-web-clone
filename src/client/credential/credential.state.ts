export class CredentialState {

  private _credentialId:string;
  private _username:string;
  private _password:string;
  private _changedPassword:string;
  private _rememberMe:boolean;

  constructor(credentialId?:string, username?: string, password?: string, changedPassword?: string, rememberMe?: boolean) {
    this._credentialId = credentialId;
    this._username = username;
    this._password = password;
    this._changedPassword = changedPassword;
    this._rememberMe = rememberMe;
  }

  get credentialId(): string {
    return this._credentialId;
  }

  set credentialId(value: string) {
    this._credentialId = value;
  }

  get rememberMe(): boolean {
    return this._rememberMe;
  }

  set rememberMe(value: boolean) {
    this._rememberMe = value;
  }
  get changedPassword(): string {
    return this._changedPassword;
  }

  set changedPassword(value: string) {
    this._changedPassword = value;
  }
  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  toJson() {
    return {
      credentialId: this.credentialId,
      username: this.username,
      password: this.password,
      changedPassword: this.changedPassword,
      rememberMe: this.rememberMe
    }
  }

}