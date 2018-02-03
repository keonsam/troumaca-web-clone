import {PersonRepository} from "./party.repository";
import {Observable} from "rxjs/Observable";
import {Person} from "./person";

export class PersonService {

  constructor(private personRepository: PersonRepository) {
  }

  public getPersons():Observable<Person[]> {
    return this.personRepository.getPersons();
  }

  public getCurrentPerson():Observable<Person> {
    return this.personRepository.getCurrentPerson();
  }
}