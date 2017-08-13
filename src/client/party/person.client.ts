import {Observable} from "rxjs/Observable";
import {PersonState} from "./person.state";

export abstract class PersonClient {
  public abstract getPersons():Observable<PersonState[]>

  public abstract getCurrentPerson():Observable<PersonState>;
}