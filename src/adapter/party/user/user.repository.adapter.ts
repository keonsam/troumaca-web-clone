import {UserRepository} from '../../../parties/users/user.repository';
import {Observable} from 'rxjs';
import {AccessRole} from '../../../access-roles/access.role';
import {Users} from '../../../parties/users';
import {User} from '../../../parties/user';
import { Credential} from '../../../authentication/credential';
import {UserClient} from '../../../client/party/user/user.client';
import {ValidResponse} from "../../../authentication/valid.response";

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

  public getUser(partyId?: string): Observable<User> {
    return this.userClient.getUserState(partyId);
  }

  public addUser(user: User, credential: Credential, partyAccessRoles: string[]): Observable<User> {
    return this.userClient.addUserState(user, credential, partyAccessRoles);
  }

  public updateUser(user: User, credential: Credential, partyAccessRoles: string[]): Observable<number> {
    return this.userClient.updateUser(user, credential, partyAccessRoles);
  }

  updateUserMe(user: User, credential: Credential): Observable<number> {
    return this.userClient.updateUserMe(user, credential);
  }

  public deleteUser(partyId: string): Observable<number> {
    return this.userClient.deleteUser(partyId);
  }

  // VALIDATION

  isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
    return this.userClient.isValidUsername(username, partyId);
  }

  isValidPassword(password: string): Observable<ValidResponse> {
    return this.userClient.isValidPassword(password);
  }
}
