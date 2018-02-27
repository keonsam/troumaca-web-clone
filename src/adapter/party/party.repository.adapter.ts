import {PartyRepository} from "../../parties/party.repository";
import {PersonClient} from "../../client/party/person.client";
import {Observable} from "rxjs/Observable";
import {Person} from "../../parties/person";
import {Persons} from "../../parties/persons";
import {Credential} from "../../parties/credential";
import "rxjs/add/operator/map";
import { map, reduce, somethingElse } from "underscore";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AssetPersonRepository} from "../../assets/asset.person.repository";
import {AssetPersons} from "../../assets/asset.persons";
import {AssetPerson} from "../../assets/asset.person";
import {PersonState} from "../../client/party/person.state";
import {CredentialState} from "../../client/party/credential.state";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";

export class PartyRepositoryAdapter extends PartyRepository implements AssetPersonRepository {

  constructor(private personClient: PersonClient) {
    super();
  }

  public getPersons(pageNumber:number, pageSize:number, sortOrder:string): Observable<Persons> {
    return this.personClient
      .getPersons(pageNumber, pageSize, sortOrder)
      .map(values => {
        let personModels:Persons = new Persons();
        personModels.persons = map(values.persons, value => {
          return mapObjectProps(value, new Person());
        });
       personModels.page = mapObjectProps(values.page, new Page());
       personModels.sort = mapObjectProps(values.sort, new Sort());
        return personModels;
      });
  }

  public getCurrentPerson(): Observable<Person> {
    return this
      .personClient
      .getCurrentPerson()
      .map(person => {
        return mapObjectProps(person, new Person());
      });
  }

  public getPerson(partyId: string): Observable<Person> {
    return this.personClient
    .getPersonState(partyId)
    .map(value => {
       return mapObjectProps(value, new Person());
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

  public addPerson(person: Person): Observable<Person> {
    return this.personClient
    .addPersonState(mapObjectProps(person, new PersonState()))
    .map(value => {
      return mapObjectProps(value, new Person());
    });
  }

  public addCredential(credential: Credential): Observable<Credential> {
    return this.personClient
    .addCredentialState(mapObjectProps(credential, new CredentialState()))
    .map(value => {
      return mapObjectProps(value, new Credential());
    });
  }

  public deletePerson(partyId: string): Observable<number> {
    return this.personClient.deletePerson(partyId);
  }

  public deleteCredential(partyId:string): Observable<number> {
    return this.personClient.deleteCredential(partyId);
  }

  public updatePerson(person: Person): Observable<number> {
    return this.personClient.updatePerson(mapObjectProps(person, new PersonState()));
  }

  public updateCredential(credential: Credential): Observable<number> {
    return this.personClient.updateCredential(mapObjectProps(credential, new CredentialState()));
  }

  public updateUserPhoto(partyId: string, croppedImage: string): Observable<number> {
    return this.personClient.updateUserPhoto(partyId, croppedImage);
  }
  
}
