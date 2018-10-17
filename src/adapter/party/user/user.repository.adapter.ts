import {UserRepository} from '../../../parties/users/user.repository';
import {Observable} from 'rxjs';
import {AccessRole} from '../../../access-roles/access.role';
import {Users} from '../../../parties/users';
import {UserResponse} from '../../../parties/user.response';
import {User} from '../../../parties/user';
import { Credential} from '../../../authentication/credential';
import {PartyAccessRole} from '../../../parties/party.access.role';
import {UserClient} from '../../../client/party/user/user.client';

export class UserRepositoryAdapter extends UserRepository {
  constructor(private userClient: UserClient) {
    super();
  }

  public findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return this.userClient.findAccessRole(searchStr, pageSize);
  }

  public getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users> {
    return this.userClient.getUsers(pageNumber, pageSize, sortOrder);
  }

  public getUser(partyId?: string): Observable<UserResponse> {
    return this.userClient.getUserState(partyId);
  }

  public addUser(user: User, credential?: Credential, partyAccessRoles?: PartyAccessRole[]): Observable<User> {
    return this.userClient.addUserState(user, credential, partyAccessRoles);
  }

  public updateUser(user: User, credential: Credential, partyAccessRoles?: PartyAccessRole[]): Observable<number> {
    return this.userClient.updateUser(user, credential, partyAccessRoles);
  }

  public deleteUser(partyId: string): Observable<number> {
    return this.userClient.deleteUser(partyId);
  }
}
