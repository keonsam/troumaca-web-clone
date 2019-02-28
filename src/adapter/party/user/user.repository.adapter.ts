import {UserRepository} from '../../../parties/users/user.repository';
import {Observable} from 'rxjs';
import {AccessRole} from '../../../access-roles/access.role';
import {Users} from '../../../parties/users';
import {User} from '../../../parties/user';
import { Credential} from '../../../authentication/credential';
import {UserClient} from '../../../client/party/user/user.client';
import {ValidResponse} from "../../../authentication/valid.response";
import {UserMe} from '../../../parties/users/user-me/user.me';

export class UserRepositoryAdapter extends UserRepository {
  constructor(private userClient: UserClient) {
    super();
  }

  findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return this.userClient.findAccessRole(searchStr, pageSize);
  }

  getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users> {
    return this.userClient.getUsers(pageNumber, pageSize, sortOrder);
  }

  getUser(partyId?: string): Observable<User> {
    return this.userClient.getUserState(partyId);
  }

  addUser(user: User, credential: Credential, partyAccessRoles: string[]): Observable<User> {
    return this.userClient.addUserState(user, credential, partyAccessRoles);
  }

  updateUser(user: User, credential: Credential, partyAccessRoles: string[]): Observable<number> {
    return this.userClient.updateUser(user, credential, partyAccessRoles);
  }

  deleteUser(partyId: string): Observable<number> {
    return this.userClient.deleteUser(partyId);
  }

  getUserMe(): Observable<UserMe> {
    return this.userClient.getUserMe();
  }

  updateUserMe(user: User, credential: Credential): Observable<number> {
    return this.userClient.updateUserMe(user, credential);
  }

  // VALIDATION

  isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
    return this.userClient.isValidUsername(username, partyId);
  }

  isValidPassword(password: string): Observable<ValidResponse> {
    return this.userClient.isValidPassword(password);
  }
}
