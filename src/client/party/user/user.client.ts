import {Observable} from 'rxjs';
import { AccessRole } from '../../../access-roles/access.role';
import { Credential } from '../../../authentication/credential';
import { User } from '../../../parties/user';
import { Users } from '../../../parties/users';
import { PartyAccessRole } from '../../../parties/party.access.role';
import {ValidResponse} from "../../../authentication/valid.response";

export abstract class UserClient {
  abstract findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]>;
  abstract addUserState(user: User, credentialState: Credential, partyAccessRoleState: PartyAccessRole[]): Observable<User>;
  abstract getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users>;
  abstract getUserState(partyId?: string): Observable<User>;
  abstract updateUser(user: User, credentialState: Credential, partyAccessRoleState: PartyAccessRole[]): Observable<number>;
  abstract deleteUser(partyId: string): Observable<number>;
  // VALIDATION
  abstract isValidUsername(username: string, partyId?: string): Observable<ValidResponse>;
  abstract isValidPassword(password: string): Observable<ValidResponse>;
}
