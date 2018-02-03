import {Person} from "./person";
import {Observable} from "rxjs/Observable";

export abstract class PersonRepository {
  abstract getPersons():Observable<Person[]>;

  abstract getCurrentPerson():Observable<Person>;
}