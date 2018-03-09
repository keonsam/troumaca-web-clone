import {PartyRepository} from "../../parties/party.repository";
import {PersonClient} from "../../client/party/person.client";
import {Observable} from "rxjs/Observable";
import {Person} from "../../parties/person";
import {Persons} from "../../parties/persons";
import {Credential} from "../../parties/credential";
import {Organization} from "../../parties/organization";
import {Organizations} from "../../parties/organizations";
import {Account} from "../../parties/account";
import "rxjs/add/operator/map";
import { map, reduce, somethingElse } from "underscore";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AssetPersonRepository} from "../../assets/asset.person.repository";
import {AssetPersons} from "../../assets/asset.persons";
import {AssetPerson} from "../../assets/asset.person";
import {PersonState} from "../../client/party/person.state";
import {OrganizationState} from "../../client/party/organization.state";
import {CredentialState} from "../../client/party/credential.state";
import {AccountState} from "../../client/party/account.state";
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

  public getOrganizations(pageNumber:number, pageSize:number, sortOrder:string): Observable<Organizations> {
    return this.personClient
      .getOrganizations(pageNumber, pageSize, sortOrder)
      .map(values => {
        let organizationModels:Organizations = new Organizations();
        organizationModels.organizations = map(values.organizations, value => {
          return mapObjectProps(value, new Organization());
        });
       organizationModels.page = mapObjectProps(values.page, new Page());
       organizationModels.sort = mapObjectProps(values.sort, new Sort());
        return organizationModels;
      });
  }


 /// to delete this
  public getCurrentPerson(): Observable<Person> {
    return this
      .personClient
      .getCurrentPerson()
      .map(person => {
        return mapObjectProps(person, new Person());
      });
  }
  ///


  public getPerson(partyId: string): Observable<Person> {
    return this.personClient
    .getPersonState(partyId)
    .map(value => {
       return mapObjectProps(value, new Person());
    });
  }

  public getOrganization(partyId: string): Observable<Organization> {
    return this.personClient
    .getOrganizationState(partyId)
    .map(value => {
       return mapObjectProps(value, new Organization());
    });
  }

  public getUserPhoto(partyId: string): Observable<string> {
    return this.personClient.getUserPhoto(partyId);
  }

  public getCompanyPhoto(partyId: string): Observable<string> {
    return this.personClient.getCompanyPhoto(partyId);
  }


  /// to delete this
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
  ///

  public addPerson(person: Person): Observable<Person> {
    return this.personClient
    .addPersonState(mapObjectProps(person, new PersonState()))
    .map(value => {
      return mapObjectProps(value, new Person());
    });
  }

  public addOrganization(organization: Organization): Observable<Organization> {
    return this.personClient
    .addOrganizationState(mapObjectProps(organization, new OrganizationState()))
    .map(value => {
      return mapObjectProps(value, new Organization());
    });
  }

  public addCredential(credential: Credential): Observable<Credential> {
    return this.personClient
    .addCredentialState(mapObjectProps(credential, new CredentialState()))
    .map(value => {
      return mapObjectProps(value, new Credential());
    });
  }

  public addAccountPhoto(partyId: string, croppedImage: string): Observable<any> {
    return this.personClient.addAccountPhoto(partyId, croppedImage);
  }

  public createAccount(account: Account): Observable<Account> {
    return this.personClient
    .createAccountState(mapObjectProps(account, new AccountState()))
    .map(value => {
      return mapObjectProps(value, new Account());
    });
  }

  public deletePerson(partyId: string): Observable<number> {
    return this.personClient.deletePerson(partyId);
  }

  public deleteOrganization(partyId: string): Observable<number> {
    return this.personClient.deleteOrganization(partyId);
  }

  public deleteCredential(partyId:string): Observable<number> {
    return this.personClient.deleteCredential(partyId);
  }

  public updatePerson(person: Person): Observable<number> {
    return this.personClient.updatePerson(mapObjectProps(person, new PersonState()));
  }

  public updateOrganization(organization: Organization): Observable<number> {
    return this.personClient.updateOrganization(mapObjectProps(organization, new OrganizationState()));
  }

  public updateCredential(credential: Credential): Observable<number> {
    return this.personClient.updateCredential(mapObjectProps(credential, new CredentialState()));
  }

  public updateUserPhoto(partyId: string, croppedImage: string): Observable<number> {
    return this.personClient.updateUserPhoto(partyId, croppedImage);
  }

  public updateCompanyPhoto(partyId: string, croppedImage: string): Observable<number> {
    return this.personClient.updateCompanyPhoto(partyId, croppedImage);
  }

}
