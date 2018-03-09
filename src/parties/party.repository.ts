import {Person} from "./person";
import {Persons} from "./persons";
import {Observable} from "rxjs/Observable";
import {Credential} from "./credential";
import {Organization} from "./organization";
import {Organizations} from "./organizations";

export abstract class PartyRepository {
  abstract getPersons(pageNumber:number, pageSize:number, sortOrder:string):Observable<Persons>;

  abstract getOrganizations(pageNumber:number, pageSize:number, sortOrder:string):Observable<Organizations>;

  //to delete this
  abstract getCurrentPerson():Observable<Person>;
  //

  abstract getPerson(partyId: string): Observable<Person>;

  abstract getOrganization(partyId: string): Observable<Organization>;

  abstract getUserPhoto(partyId: string): Observable<string>;

  abstract getCompanyPhoto(partyId: string): Observable<string>;

  abstract addPerson(person: Person): Observable<Person>;

  abstract addOrganization(organization: Organization): Observable<Organization>;

  abstract addCredential(credential: Credential): Observable<Credential>;

  abstract deletePerson(partyId: string): Observable<number>;

  abstract deleteOrganization(partyId: string): Observable<number>;

  abstract deleteCredential(partyId: string): Observable<number>;

  abstract updatePerson(person: Person): Observable<number>;

  abstract updateOrganization(organization: Organization): Observable<number>;

  abstract updateCredential(credential: Credential): Observable<number>;

  abstract updateUserPhoto(partyId: string, croppedImage: string): Observable<number>;

  abstract updateCompanyPhoto(partyId: string, croppedImage: string): Observable<number>;

}
