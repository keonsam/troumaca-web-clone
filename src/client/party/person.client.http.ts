import {UUIDGenerator} from "../../uuid.generator";
import {PersonClient} from "./person.client";
import {Observable} from "rxjs/Observable";
import {PersonState} from "./person.state";

export class PersonClientHttp implements PersonClient {

  constructor(private uuidGenerator: UUIDGenerator) {
  }

  public getPersons(): Observable<PersonState[]> {
    return null;
  }


  public getCurrentPerson(): Observable<PersonState> {
    return null;
  }
}