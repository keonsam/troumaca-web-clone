import {Person} from "./person";
import {Observable} from "rxjs/Observable";

export abstract class PartyRepository {
  abstract getPersons():Observable<Person[]>;

  abstract getCurrentPerson():Observable<Person>;
}