import {Observable} from "rxjs/Observable";
import {PersonState} from "./person.state";
import {PersonStates} from "./person.states";
import {CredentialState} from "./credential.state";
import {OrganizationState} from "./organization.state";
import {OrganizationStates} from "./organization.states";
import {AccountState} from "./account.state";

export abstract class PersonClient {
  public abstract getPersons(pageNumber:number, pageSize:number, sortOrder:string):Observable<PersonStates>
  public abstract getOrganizations(pageNumber:number, pageSize:number, sortOrder:string):Observable<OrganizationStates>

  //to delete this
  public abstract getCurrentPerson():Observable<PersonState>;
  ////

  public abstract getPersonState(partyId: string): Observable<PersonState>;
  public abstract getOrganizationState(partyId: string): Observable<OrganizationState>;

  public abstract getUserPhoto(partyId: string): Observable<string>;
  public abstract getCompanyPhoto(partyId: string): Observable<string>;


  /// to delete this
  public abstract findPersonStates(searchStr:string, pageSize:number):Observable<PersonStates>;
  ///
  public abstract addPersonState(personState: PersonState): Observable<PersonState>;
  public abstract addOrganizationState(organizationState: OrganizationState): Observable<OrganizationState>;
  public abstract addCredentialState(credentialState: CredentialState): Observable<CredentialState>;
  public abstract addAccountPhoto(partyId: string, croppedImage:string): Observable<any>;
  public abstract createAccountState(accountState: AccountState): Observable<AccountState>;

  public abstract deletePerson(partyId: string): Observable<number>;
  public abstract deleteOrganization(partyId: string): Observable<number>;
  public abstract deleteCredential(partyId: string): Observable<number>;

  public abstract updatePerson(personState: PersonState): Observable<number>;
  public abstract updateOrganization(organizationState: OrganizationState): Observable<number>;
  public abstract updateCredential(credentialState: CredentialState): Observable<number>;

  public abstract updateUserPhoto(partyId: string, croppedImage:string): Observable<number>;
  public abstract updateCompanyPhoto(partyId: string, croppedImage:string): Observable<number>;

}
