export class SignUpModel {

  get rememberMe(): boolean {
    return this._rememberMe;
  }

  set rememberMe(value: boolean) {
    this._rememberMe = value;
  }
  get confirmPassword(): string {
    return this._confirmPassword;
  }

  set confirmPassword(value: string) {
    this._confirmPassword = value;
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

  constructor(username?: string, password?: string, confirmPassword?: string, rememberMe?: boolean) {
    this._username = username;
    this._password = password;
    this._confirmPassword = confirmPassword;
    this._rememberMe = rememberMe;
  }

  private _username: string;
  private _password: string;
  private _confirmPassword: string;
  private _rememberMe: boolean;

}
