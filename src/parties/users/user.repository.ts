import { User } from '../user';
import { Users } from '../users';
import {Observable} from 'rxjs';
import { Credential } from '../../authentication/credential';
import { PartyAccessRole } from '../party.access.role';
import { AccessRole} from '../../access-roles/access.role';
import {ValidResponse} from "../../authentication/valid.response";

export abstract class UserRepository {

  abstract findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]>;
  abstract addUser(user: User, credential: Credential, partyAccessRole?: PartyAccessRole[]): Observable<User>;
  abstract getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users>;
  abstract getUser(userId?: string): Observable<User>;
  abstract updateUser(user: User, credential: Credential, partyAccessRole?: PartyAccessRole[]): Observable<number>;
  abstract deleteUser(userId: string): Observable<number>;

  // Validation
  abstract isValidUsername(username: string, partyId?: string): Observable<ValidResponse>;
  abstract isValidPassword(password: string): Observable<ValidResponse>;

}
