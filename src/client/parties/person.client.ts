import {Observable} from "rxjs/Observable";
import {PersonState} from "./person.state";
import {PersonStates} from "./person.states";

export abstract class PersonClient {
  public abstract getPersons():Observable<PersonState[]>
  public abstract getCurrentPerson():Observable<PersonState>;
  public abstract findPersonStates(searchStr:string, pageSize:number):Observable<PersonStates>;
}