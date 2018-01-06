import {PersonRepository} from "../../person/person.repository";
import {PersonClient} from "../../client/parties/person.client";
import {Observable} from "rxjs/Observable";
import {PersonModel} from "../../person/person.model";
import "rxjs/add/operator/map";
import { map, reduce, somethingElse } from "underscore";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AssetPersonRepository} from "../../assets/asset.person.repository";
import {AssetPersons} from "../../assets/asset.persons";
import {AssetPerson} from "../../assets/asset.person";

export class PersonRepositoryAdapter extends PersonRepository implements AssetPersonRepository {

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


  public findPersons(searchStr: string, pageSize: number): Observable<AssetPersons> {
    return this.personClient
      .findPersonStates(searchStr, pageSize)
      .map(values => {
        let persons:AssetPersons = new AssetPersons();
        persons.persons = map(values.persons, value => {
          return mapObjectProps(value, new AssetPerson());
        });
        return persons;
      });
  }
}