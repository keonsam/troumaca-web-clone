import {Observable} from 'rxjs';
import {UserResponse} from '../../../parties/user.response';
import { AccessRole } from '../../../access-roles/access.role';
import { Credential } from '../../../authentication/credential';
import { User } from '../../../parties/user';
import { Users } from '../../../parties/users';
import { PartyAccessRole } from '../../../parties/party.access.role';

export abstract class UserClient {
  abstract findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]>;
  abstract addUserState(user: User, credentialState: Credential, partyAccessRoleState: PartyAccessRole[]): Observable<User>;
  abstract getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users>;
  abstract getUserState(partyId?: string): Observable<UserResponse>;
  abstract updateUser(user: User, credentialState: Credential, partyAccessRoleState: PartyAccessRole[]): Observable<number>;
  abstract updateUserMe(user: User, credentialState: Credential): Observable<number>;
  abstract deleteUser(partyId: string): Observable<number>;
}
