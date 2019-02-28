import {Observable} from 'rxjs';
import { AccessRole } from '../../../access-roles/access.role';
import { Credential } from '../../../authentication/credential';
import { User } from '../../../parties/user';
import { Users } from '../../../parties/users';
import {ValidResponse} from '../../../authentication/valid.response';
import {UserMe} from '../../../parties/users/user-me/user.me';

export abstract class UserClient {
  abstract findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]>;
  abstract addUserState(user: User, credentialState: Credential, partyAccessRoleState: string[]): Observable<User>;
  abstract getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users>;
  abstract getUserState(partyId?: string): Observable<User>;
  abstract updateUser(user: User, credentialState: Credential, partyAccessRoleState: string[]): Observable<number>;
  abstract updateUserMe(user: User, credential: Credential): Observable<number>;
  abstract deleteUser(partyId: string): Observable<number>;

  abstract getUserMe(): Observable<UserMe>;
  // VALIDATION
  abstract isValidUsername(username: string, partyId?: string): Observable<ValidResponse>;
  abstract isValidPassword(password: string): Observable<ValidResponse>;
}
