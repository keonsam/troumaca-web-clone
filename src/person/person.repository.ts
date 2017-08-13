import {PersonModel} from "./person.model";
import {Observable} from "rxjs/Observable";

export abstract class PersonRepository {
  abstract getPersons():Observable<PersonModel[]>;

  abstract getCurrentPerson():Observable<PersonModel>;
}