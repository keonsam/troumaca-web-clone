import {UserRepository} from '../../../parties/users/user.repository';
import {Observable} from 'rxjs';
import {AccessRole} from '../../../access-roles/access.role';
import {Users} from '../../../parties/users';
import {UserResponse} from '../../../parties/user.response';
import {User} from '../../../parties/user';
import { Credential} from "../../../authentication/credential";
import {PartyAccessRole} from '../../../parties/party.access.role';
import {UserClient} from '../../../client/party/user/user.client';
import {mapObjectProps} from '../../../mapper/object.property.mapper';
import { map } from 'rxjs/operators';
import {Page} from '../../../page/page';
import {Sort} from '../../../sort/sort';
import {UserState} from '../../../client/party/user.state';
import {CredentialState} from '../../../client/credential/credential.state';
import {PartyAccessRoleState} from '../../../client/party/party.access.role.state';

export class UserRepositoryAdapter extends UserRepository {
  constructor(private userClient: UserClient) {
    super();
  }

  public findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return this.userClient.findAccessRole(searchStr, pageSize)
      .pipe(map(val => val.map( x => mapObjectProps(x, new AccessRole()))));
  }

  public getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users> {
    return this.userClient.getUsers(pageNumber, pageSize, sortOrder)
      .pipe(map(values => {
        const userModels: Users = new Users();
        userModels.users = values.users.map( value => {
          return mapObjectProps(value, new User());
        });
        userModels.page = mapObjectProps(values.page, new Page());
        userModels.sort = mapObjectProps(values.sort, new Sort());
        return userModels;
      }));
  }

  public getUser(partyId?: string): Observable<UserResponse> {
    return this.userClient.getUserState(partyId);
  }

  public addUser(user: User, credential?: Credential, partyAccessRoles?: PartyAccessRole[]): Observable<User> {
    let newPartyAccessRoles: PartyAccessRoleState[];
    if (partyAccessRoles && partyAccessRoles.length > 0) {
      newPartyAccessRoles = partyAccessRoles.map(x => mapObjectProps(x, new PartyAccessRoleState()))
    }
    let newCredential: CredentialState;
    if (credential) {
      newCredential = mapObjectProps(credential, new CredentialState());
    }
    return this.userClient
      .addUserState(mapObjectProps(user, new UserState()), newCredential,
        newPartyAccessRoles)
      .pipe(map( val => mapObjectProps(val, new User())));
  }

  public updateUser(user: User, credential: Credential, partyAccessRoles?: PartyAccessRole[]): Observable<number> {
    let newPartyAccessRoles: PartyAccessRoleState[];
    if (partyAccessRoles && partyAccessRoles.length > 0) {
      newPartyAccessRoles = partyAccessRoles.map(x => mapObjectProps(x, new PartyAccessRoleState()))
    }
    return this.userClient
      .updateUser(mapObjectProps(user, new UserState()), mapObjectProps(credential, new CredentialState()),
        newPartyAccessRoles);
  }

  public deleteUser(partyId: string): Observable<number> {
    return this.userClient.deleteUser(partyId);
  }
}
