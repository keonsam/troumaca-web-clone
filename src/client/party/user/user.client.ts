import {Observable} from "rxjs";
import {UserResponse} from "../../../parties/user.response";
import { AccessRoleState } from "../../access-roles/access.role.state";
import { CredentialState } from "../../credential/credential.state";
import { UserState } from "../user.state";
import { UserStates } from "../user.states";
import { PartyAccessRoleState } from "../party.access.role.state";

export abstract class UserClient {
  abstract findAccessRole(searchStr: string, pageSize: number): Observable<AccessRoleState[]>;

  abstract addUserState(user: UserState, credentialState?: CredentialState, partyAccessRoleState?: PartyAccessRoleState[]): Observable<UserState>;

  abstract getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<UserStates>;

  abstract getUserState(partyId?: string): Observable<UserResponse>;

  abstract updateUser(user: UserState, credentialState: CredentialState, partyAccessRoleState?: PartyAccessRoleState[]): Observable<number>;

  abstract deleteUser(partyId: string): Observable<number>;
}
