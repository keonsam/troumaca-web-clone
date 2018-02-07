import {PartyRepository} from "./party.repository";
import {Observable} from "rxjs/Observable";
import {Person} from "./person";

export class PartyService {

  constructor(private partyRepository: PartyRepository) {
  }

  public getPersons():Observable<Person[]> {
    return this.partyRepository.getPersons();
  }

  public getCurrentPerson():Observable<Person> {
    return this.partyRepository.getCurrentPerson();
  }
}