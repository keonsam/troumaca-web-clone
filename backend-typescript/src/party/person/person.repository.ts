import {Observable} from "rxjs/Observable";
import {Person} from "./person";

export interface PersonRepository {

  findPerson(searchStr:string, pageSize:number): Observable<Person[]>;

}
