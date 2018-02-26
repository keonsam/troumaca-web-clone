import {Observable} from "rxjs/Observable";
import {PersonState} from "./person.state";
import {PersonStates} from "./person.states";
import {CredentialState} from "./credential.state";

export abstract class PersonClient {
  public abstract getPersons(pageNumber:number, pageSize:number, sortOrder:string):Observable<PersonStates>
  public abstract getCurrentPerson():Observable<PersonState>;
  public abstract getPersonState(partyId: string): Observable<PersonState>;
  public abstract findPersonStates(searchStr:string, pageSize:number):Observable<PersonStates>;
  public abstract addPersonState(personState: PersonState): Observable<PersonState>;
  public abstract addCredentialState(credentialState: CredentialState): Observable<CredentialState>;
  public abstract deletePerson(partyId: string): Observable<number>;
  public abstract deleteCredential(partyId: string): Observable<number>;
  public abstract updatePerson(personState: PersonState): Observable<number>;
  public abstract updateCredential(credentialState: CredentialState): Observable<number>;
}
