import {PartyRepository} from '../../parties/party.repository';
import {PersonClient} from '../../client/party/person.client';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {User} from '../../parties/user';
import {Users} from '../../parties/users';
import {Credential} from '../../parties/credential';
import {Organization} from '../../parties/organization';
import {Organizations} from '../../parties/organizations';

import {mapObjectProps} from '../../mapper/object.property.mapper';
import {UserState} from '../../client/party/user.state';
import {OrganizationState} from '../../client/party/organization.state';
import {CredentialState} from '../../client/party/credential.state';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {AccountResponse} from '../../parties/account.response';
import {PartyAccessRole} from '../../parties/party.access.role';
import {AccessRole} from '../../access-roles/access.role';
import {PartyAccessRoleState} from '../../client/party/party.access.role.state';
import {Photo} from '../../parties/photo';
import {PhotoState} from '../../client/party/photo.state';
import {UserResponse} from '../../parties/user.response';

export class PartyRepositoryAdapter extends PartyRepository {

  constructor(private personClient: PersonClient) {
    super();
  }

  public findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return this.personClient.findAccessRole(searchStr, pageSize)
      .pipe(map(accessRoles => {
        return accessRoles.map( value => {
          return mapObjectProps(value, new AccessRole());
        });
      }));
  }

  public logOutUser(): Observable<boolean> {
    return this.personClient.logOutUser();
  }

  public getPartyId(): Observable<string> {
    return this.personClient.getPartyId();
  }

  public getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users> {
    return this.personClient
      .getUsers(pageNumber, pageSize, sortOrder)
      .pipe(map(values => {
        const userModels: Users = new Users();
        userModels.users = values.users.map( value => {
          return mapObjectProps(value, new User());
        });
        // if (!values.partyAccessRoles) {
        //   values.partyAccessRoles = [];
        // }
        // userModels.partyAccessRoles = values.partyAccessRoles.map( value => {
        //   return mapObjectProps(value, new PartyAccessRole());
        // });
       userModels.page = mapObjectProps(values.page, new Page());
       userModels.sort = mapObjectProps(values.sort, new Sort());
        return userModels;
      }));
  }

  public getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations> {
    return this.personClient
      .getOrganizations(pageNumber, pageSize, sortOrder)
      .pipe(map(values => {
        const organizationModels: Organizations = new Organizations();
        organizationModels.organizations = values.organizations.map( value => {
          return mapObjectProps(value, new Organization());
        });
       organizationModels.page = mapObjectProps(values.page, new Page());
       organizationModels.sort = mapObjectProps(values.sort, new Sort());
        return organizationModels;
      }));
  }

  public getUser(partyId: string): Observable<UserResponse> {
    return this.personClient.getUserState(partyId);
  }

  public getPartyAccessRoleById(partyId: string): Observable<PartyAccessRole[]> {
    return this.personClient
      .getPartyAccessRoleById(partyId)
      .pipe(map(values => {
        return values.map( value => {
          return mapObjectProps(value, new PartyAccessRole())
        });
      }));
  }

  public getPartyAccessRoles(): Observable<PartyAccessRole[]> {
    return this.personClient.getPartyAccessRoles()
      .pipe(map(value => {
        return value.map( next => {
          return mapObjectProps(next , new PartyAccessRole());
        });
      }));
  }

  public getOrganization(partyId: string): Observable<Organization> {
    return this.personClient
    .getOrganizationState(partyId)
    .pipe(map(value => {
       return mapObjectProps(value, new Organization());
    }));
  }

  public getPhoto(partyId: string, type: string): Observable<Photo> {
    return this.personClient.getPhoto(partyId, type)
      .pipe(map(value => {
        return mapObjectProps(value, new Photo());
      }));
  }

  public addUser(user: User, partyAccessRoles: PartyAccessRole[]): Observable<User> {
    return this.personClient
    .addUserState(mapObjectProps(user, new UserState()), partyAccessRoles.map( data => {
      return mapObjectProps(data, new PartyAccessRoleState());
    }))
    .pipe(map(value => {
      return mapObjectProps(value, new User());
    }));
  }

  public addOrganization(organization: Organization): Observable<Organization> {
    return this.personClient
    .addOrganizationState(mapObjectProps(organization, new OrganizationState()))
    .pipe(map(value => {
      return mapObjectProps(value, new Organization());
    }));
  }

  public addPhoto(photo: Photo, type: string, ): Observable<Photo> {
    return this.personClient.addPhoto(mapObjectProps(photo, new PhotoState()), type)
      .pipe(map(value => {
        return mapObjectProps(value, new Photo());
      }));
  }

  public addAccount(user: User, organization: Organization): Observable<AccountResponse> {
    return this.personClient
    .addAccountState(mapObjectProps(user, new UserState()), mapObjectProps(organization, new OrganizationState()))
    .pipe(map(value => {
      return mapObjectProps(value, new AccountResponse());
    }));
  }

  public deleteUser(partyId: string): Observable<number> {
    return this.personClient.deleteUser(partyId);
  }

  public deleteOrganization(partyId: string): Observable<number> {
    return this.personClient.deleteOrganization(partyId);
  }

  public updateUser(user: User, partyAccessRoles: PartyAccessRole[]): Observable<number> {
    return this.personClient.updateUser(mapObjectProps(user, new UserState()),  partyAccessRoles.map( value => {
      return mapObjectProps(value, new PartyAccessRoleState());
    }));
  }

  public updateUserMe(user: User, credential: Credential): Observable<number> {
    return this.personClient.updateUserMe(mapObjectProps(user, new UserState()),  mapObjectProps(credential, new CredentialState()));
  }

  public updateOrganization(organization: Organization): Observable<number> {
    return this.personClient.updateOrganization(mapObjectProps(organization, new OrganizationState()));
  }

  public updateCredential(credential: Credential): Observable<number> {
    return this.personClient.updateCredential(mapObjectProps(credential, new CredentialState()));
  }

  public updatePhoto(partyId: string, photo: Photo, type: string): Observable<number> {
    return this.personClient.updatePhoto(partyId, mapObjectProps(photo, new PhotoState()), type);
  }

  // authentication part

  isValidUsername(username: string, partyId?: string): Observable<boolean> {
    return this.personClient.isValidUsername(username, partyId);
  }

  isValidPassword(password: string): Observable<boolean> {
    return this.personClient.isValidPassword(password);
  }

}
