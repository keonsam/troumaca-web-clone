import {PartyRepository} from "../../parties/party.repository";
import {PersonClient} from "../../client/party/person.client";
import {Observable} from "rxjs/Observable";
import {User} from "../../parties/user";
import {Users} from "../../parties/users";
import {Credential} from "../../parties/credential";
import {Organization} from "../../parties/organization";
import {Organizations} from "../../parties/organizations";
import "rxjs/add/operator/map";
import { map, reduce, somethingElse } from "underscore";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {UserState} from "../../client/party/user.state";
import {OrganizationState} from "../../client/party/organization.state";
import {CredentialState} from "../../client/party/credential.state";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";
import {AccountResponse} from "../../parties/account.response";
import {AccessRole} from "../../parties/access.role";

export class PartyRepositoryAdapter extends PartyRepository {

  constructor(private personClient: PersonClient) {
    super();
  }

  public findAccessRole(searchStr: string, pageSize: number) :Observable<AccessRole[]> {
    return this.personClient.findAccessRole(searchStr, pageSize)
      .map(accessRoles => {
        return map(accessRoles, value => {
          return mapObjectProps(value, new AccessRole());
        })
      });
  }

  public logOutUser(): Observable<boolean> {
    return this.personClient.logOutUser();
  }

  public getPartyId(): Observable<string> {
    return this.personClient.getPartyId();
  }

  public getUsers(pageNumber:number, pageSize:number, sortOrder:string): Observable<Users> {
    return this.personClient
      .getUsers(pageNumber, pageSize, sortOrder)
      .map(values => {
        let userModels:Users = new Users();
        userModels.users = map(values.users, value => {
          return mapObjectProps(value, new User());
        });
       userModels.page = mapObjectProps(values.page, new Page());
       userModels.sort = mapObjectProps(values.sort, new Sort());
        return userModels;
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

  public getUser(partyId: string): Observable<User> {
    return this.personClient
    .getUserState(partyId)
    .map(value => {
       return mapObjectProps(value, new User());
    });
  }

  public getAccessRoleById(partyId: string) :Observable<AccessRole> {
    return this.personClient
      .getAccessRoleById(partyId)
      .map(value => {
        return mapObjectProps(value, new AccessRole());
      });
  }

  public getOrganization(partyId: string): Observable<Organization> {
    return this.personClient
    .getOrganizationState(partyId)
    .map(value => {
       return mapObjectProps(value, new Organization());
    });
  }

  public getPhoto(partyId: string): Observable<string> {
    return this.personClient.getPhoto(partyId);
  }

  public addUser(user: User, accessRoleId: string): Observable<User> {
    return this.personClient
    .addUserState(mapObjectProps(user, new UserState()), accessRoleId)
    .map(value => {
      return mapObjectProps(value, new User());
    });
  }

  public addOrganization(organization: Organization): Observable<Organization> {
    return this.personClient
    .addOrganizationState(mapObjectProps(organization, new OrganizationState()))
    .map(value => {
      return mapObjectProps(value, new Organization());
    });
  }

  public addPhoto(partyId: string, croppedImage: string): Observable<any> {
    return this.personClient.addPhoto(partyId, croppedImage);
  }

  public addAccount(accountType: string, user: User, organization: Organization): Observable<AccountResponse> {
    return this.personClient
    .addAccountState(accountType,mapObjectProps(user, new UserState()), mapObjectProps(organization, new OrganizationState()))
    .map(value => {
      console.log(value);
      return mapObjectProps(value, new AccountResponse());
    });
  }

  public deleteUser(partyId: string): Observable<number> {
    return this.personClient.deleteUser(partyId);
  }

  public deleteOrganization(partyId: string): Observable<number> {
    return this.personClient.deleteOrganization(partyId);
  }

  public updateUser(user: User, accessRoleId: string): Observable<number> {
    return this.personClient.updateUser(mapObjectProps(user, new UserState()), accessRoleId);
  }

  public updateOrganization(organization: Organization): Observable<number> {
    return this.personClient.updateOrganization(mapObjectProps(organization, new OrganizationState()));
  }

  public updateCredential(credential: Credential): Observable<number> {
    return this.personClient.updateCredential(mapObjectProps(credential, new CredentialState()));
  }

  public updatePhoto(partyId: string, croppedImage: string): Observable<number> {
    return this.personClient.updatePhoto(partyId, croppedImage);
  }

  // authentication part
  isValidPassword(password: string): Observable<boolean> {
    return this.personClient.isValidPassword(password);
  }

  isValidUsername(username: string): Observable<boolean> {
    return this.personClient.isValidUsername(username);
  }

  isValidEditUsername(partyId: string, username: string): Observable<boolean> {
    return this.personClient.isValidEditUsername(partyId, username);
  }

}
