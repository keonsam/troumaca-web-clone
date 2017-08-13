
export class SignInModel {
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
  get emailOrPhone(): string {
    return this._emailOrPhone;
  }

  set emailOrPhone(value: string) {
    this._emailOrPhone = value;
  }


  constructor(emailOrPhone?: string, password?: string, changedPassword?: string, rememberMe?: boolean) {
    this._emailOrPhone = emailOrPhone;
    this._password = password;
    this._changedPassword = changedPassword;
    this._rememberMe = rememberMe;
  }

  private _emailOrPhone:string;
  private _password:string;
  private _changedPassword:string;
  private _rememberMe:boolean;

}