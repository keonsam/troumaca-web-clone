import {Session} from "../session/session";
import {Person} from "./person/person";
import {Organization} from "./organization/organization";
import {Credential} from "../authentication/credential/credential";

export class AccountResponse {

  private _created:boolean;
  private _session:Session;
  private _credential:Credential;
  private _person:Person;
  private _organization:Organization;

  constructor(created?: boolean, session?: Session, credential?:Credential, person?: Person, organization?: Organization) {
    this._created = created;
    this._session = session;
    this._credential = credential;
    this._person = person;
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

  get person(): Person {
    return this._person;
  }

  set person(value: Person) {
    this._person = value;
  }

  get organization(): Organization {
    return this._organization;
  }

  set organization(value: Organization) {
    this._organization = value;
  }
}