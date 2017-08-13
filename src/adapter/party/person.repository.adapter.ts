import {PersonRepository} from "../../person/person.repository";
import {PersonClient} from "../../client/party/person.client";
import {Observable} from "rxjs/Observable";
import {PersonModel} from "../../person/person.model";
import "rxjs/add/operator/map";
import {mapObjectProps} from "../object.property.mapper";

export class PersonRepositoryAdapter extends PersonRepository {

  constructor(private personClient: PersonClient) {
    super();
  }

  public getPersons(): Observable<PersonModel[]> {
    return this
      .personClient
      .getPersons()
      .map(persons => {
        return persons.map(personState => {
          return mapObjectProps(personState, new PersonModel())
        });
      });
  }

  public getCurrentPerson(): Observable<PersonModel> {
    return this
      .personClient
      .getCurrentPerson()
      .map(person => {
        return mapObjectProps(person, new PersonModel());
      });
  }

}