import {PartyRepository} from "./party.repository";
import {Observable} from "rxjs/Observable";
import {Person} from "./person";
import {Persons} from "./persons";
import {Credential} from "./credential";

export class PartyService {

  constructor(private partyRepository: PartyRepository) {
  }

  public getPersons(pageNumber:number, pageSize:number, sortOrder:string):Observable<Persons> {
    return this.partyRepository.getPersons(pageNumber, pageSize, sortOrder);
  }

  public getCurrentPerson():Observable<Person> {
    return this.partyRepository.getCurrentPerson();
  }

  public getPerson(partyId: string):Observable<Person> {
    return this.partyRepository.getPerson(partyId);
  }

  public getUserPhoto(partyId: string): Observable<string> {
    return this.partyRepository.getUserPhoto(partyId);
  }

  public addPerson(person: Person): Observable<Person> {
    return this.partyRepository.addPerson(person);
  }

  public addCredential(credential: Credential): Observable<Credential> {
    return this.partyRepository.addCredential(credential);
  }

  public deletePerson(partyId: string): Observable<number> {
    return this.partyRepository.deletePerson(partyId);
  }

  public deleteCredential(partyId: string): Observable<number> {
    return this.partyRepository.deleteCredential(partyId);
  }

  public updatePerson(person: Person): Observable<number> {
    return this.partyRepository.updatePerson(person);
  }

  public updateCredential(credential: Credential): Observable<number> {
    return this.partyRepository.updateCredential(credential);
  }

  public updateUserPhoto(partyId: string, croppedImage: string): Observable<number> {
    return this.partyRepository.updateUserPhoto(partyId, croppedImage);
  }

}
