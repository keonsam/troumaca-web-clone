import {PersonClient} from "./person.client";
import {CredentialState} from "./credential.state";
import {Observable} from "rxjs/Observable";
import {PersonState} from "./person.state";
import {UUIDGenerator} from "../../uuid.generator";
import "rxjs/add/observable/of";
import {PersonStates} from "./person.states";

export class PersonClientMock implements PersonClient {

  constructor(private uuidGenerator: UUIDGenerator) {
  }

  public getPersons(pageNumber:number, pageSize:number, sortOrder:string): Observable<PersonStates> {
    return null
  }


  public getCurrentPerson(): Observable<PersonState> {
    let personState:PersonState = new PersonState();
    personState.partyId = this.uuidGenerator.generateUUID();
    personState.firstName = "Michael";
    personState.middleName = "Frederick";
    personState.lastName = "Williams";
    personState.dateOfBirth = new Date('1980-04-03');

    return Observable.of(personState);
  }

  public getPersonState(partyId: string): Observable<PersonState> {
    return null;
  }

  public getUserPhoto(partyId: string): Observable<string> {
    return null;
  }

  public findPersonStates(searchStr: string, pageSize: number): Observable<PersonStates> {
    return Observable.of(new PersonStates());
  }

  public addPersonState(personState: PersonState): Observable<PersonState> {
    return null;
  }

  public addCredentialState(credentialState: CredentialState): Observable<CredentialState> {
    return null;
  }

  public deletePerson(partyId: string): Observable<number> {
    return null;
  }

  public deleteCredential(partyId: string): Observable<number> {
    return null;
  }

  public updatePerson(personState: PersonState): Observable<number> {
    return null;
  }

  public updateCredential(credentialState: CredentialState): Observable<number> {
    return null;
  }

  public updateUserPhoto(partyId: string, croppedImage: string): Observable<number> {
    return null;
  }

}
