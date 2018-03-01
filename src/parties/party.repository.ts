import {Person} from "./person";
import {Persons} from "./persons";
import {Observable} from "rxjs/Observable";
import {Credential} from "./credential";

export abstract class PartyRepository {
  abstract getPersons(pageNumber:number, pageSize:number, sortOrder:string):Observable<Persons>;

  abstract getCurrentPerson():Observable<Person>;

  abstract getPerson(partyId: string): Observable<Person>;

  abstract getUserPhoto(partyId: string): Observable<string>;

  abstract addPerson(person: Person): Observable<Person>;

  abstract addCredential(credential: Credential): Observable<Credential>;

  abstract deletePerson(partyId: string): Observable<number>;

  abstract deleteCredential(partyId: string): Observable<number>;

  abstract updatePerson(person: Person): Observable<number>;

  abstract updateCredential(credential: Credential): Observable<number>;

  abstract updateUserPhoto(partyId: string, croppedImage: string): Observable<number>;
}
