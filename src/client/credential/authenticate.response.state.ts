import {CredentialState} from "./credential.state";
import {SessionState} from "./session.state";

export class AuthenticateResponseState {

  private _authenticated:boolean;
  private _usernameConfirmed:boolean;
  private _accountExists:boolean;
  private _credential:CredentialState;
  private _session:SessionState;
  private _credentialConfirmationId: string;

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

  get accountExists(): boolean {
    return this._accountExists;
  }

  set accountExists(value: boolean) {
    this._accountExists = value;
  }

  get credential(): CredentialState {
    return this._credential;
  }

  set credential(value: CredentialState) {
    this._credential = value;
  }

  get session(): SessionState {
    return this._session;
  }

  set session(value: SessionState) {
    this._session = value;
  }

  get credentialConfirmationId(): string {
    return this._credentialConfirmationId;
  }

  set credentialConfirmationId(value: string) {
    this._credentialConfirmationId = value;
  }
}
