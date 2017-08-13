import {PersonRepository} from "./person.repository";
import {Observable} from "rxjs/Observable";
import {PersonModel} from "./person.model";

export class PersonService {

  constructor(private personRepository: PersonRepository) {
  }

  public getPersons():Observable<PersonModel[]> {
    return this.personRepository.getPersons();
  }

  public getCurrentPerson():Observable<PersonModel> {
    return this.personRepository.getCurrentPerson();
  }
}