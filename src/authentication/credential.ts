import { parse, format, isValidNumber } from 'libphonenumber-js'

export class Credential {

  private _credentialId:string;
  private _username:string;
  private _password:string;
  private _changedPassword:string;
  private _rememberMe:boolean;
  private _status: string;
  private emailRegEx:RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  private numberRegEx:RegExp = new RegExp(/^\d+$/);

  constructor(username?: string, password?: string, changedPassword?: string, rememberMe?: boolean) {
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

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  public isUsernameValid():boolean {
    if (!this.username) {
      return false
    }

    let validEmail:boolean = this.emailRegEx.test(this.username);

    if (validEmail) {
      return validEmail;
    }

    // let validNumber = this.numberRegEx.test(this.username);

    // if (!validNumber) {
    //   return validNumber;
    // }

    console.log(this.username);

    // need to internationalized
    let parsedNumber = parse(this.username, "US");

    let validNumber2 = false;

    if (parsedNumber.phone) {
      validNumber2 = isValidNumber(parsedNumber);
    }

    return validNumber2;
  }

}
