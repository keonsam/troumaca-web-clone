import {Session} from "./session";
import {Credential} from "./credential";

export class AuthenticateResponse {

  private _authenticated:boolean;
  private _usernameConfirmed:boolean;
  private _credentialConfirmationId: string;
  private _accountExists:boolean;
  private _credential:Credential;
  private _session:Session;


  get authenticated(): boolean {
    return this._authenticated;
  }

  set authenticated(value: boolean) {
    this._authenticated = value;
  }

  get usernameConfirmed(): boolean {
    return this._usernameConfirmed;
  }

  set usernameConfirmed(value: boolean) {
    this._usernameConfirmed = value;
  }


  get credentialConfirmationId(): string {
    return this._credentialConfirmationId;
  }

  set credentialConfirmationId(value: string) {
    this._credentialConfirmationId = value;
  }

  get accountExists(): boolean {
    return this._accountExists;
  }

  set accountExists(value: boolean) {
    this._accountExists = value;
  }

  get credential(): Credential {
    return this._credential;
  }

  set credential(value: Credential) {
    this._credential = value;
  }

  get session(): Session {
    return this._session;
  }

  set session(value: Session) {
    this._session = value;
  }

  toJson() {
    return {
      authenticated: this.authenticated,
      usernameConfirmed: this.usernameConfirmed,
      credentialConfirmationId: this.credentialConfirmationId,
      accountExists: this.accountExists,
      credential: this.credential,
      session: this.session
    }
  }
}

