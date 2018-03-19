import {Session} from "../session/session";
import {User} from "./user/user";
import {Organization} from "./organization/organization";
import {Credential} from "../authentication/credential/credential";

export class AccountResponse {

  private _created:boolean;
  private _session:Session;
  private _credential:Credential;
  private _user:User;
  private _organization:Organization;

  constructor(created?: boolean, session?: Session, credential?:Credential, user?: User, organization?: Organization) {
    this._created = created;
    this._session = session;
    this._credential = credential;
    this._user = user;
    this._organization = organization;
  }

  get created(): boolean {
    return this._created;
  }

  set created(value: boolean) {
    this._created = value;
  }

  get session(): Session {
    return this._session;
  }

  set session(value: Session) {
    this._session = value;
  }

  get credential(): Credential {
    return this._credential;
  }

  set credential(value: Credential) {
    this._credential = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get organization(): Organization {
    return this._organization;
  }

  set organization(value: Organization) {
    this._organization = value;
  }
}
