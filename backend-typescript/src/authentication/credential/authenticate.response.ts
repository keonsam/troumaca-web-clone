import {Session} from "../../session/session";
import {Credential} from "./credential";

export class AuthenticateResponse {

  private _authenticated:boolean;
  private _usernameConfirmed:boolean;
  private _accountExists:boolean;
  private _credential:Credential;
  private _session:Session;
  private _credentialConfirmationId: string;


  constructor(authenticated?: boolean, usernameConfirmed?:boolean, accountExists?:boolean, credential?: Credential, session?: Session, credentialConfirmationId?: string) {
    this._authenticated = authenticated;
    this._usernameConfirmed = usernameConfirmed;
    this._accountExists = accountExists;
    this._credential = credential;
    this._session = session;
    this._credentialConfirmationId = credentialConfirmationId;
  }

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

  get credentialConfirmationId(): string {
    return this._credentialConfirmationId;
  }

  set credentialConfirmationId(value: string) {
    this._credentialConfirmationId = value;
  }
}
