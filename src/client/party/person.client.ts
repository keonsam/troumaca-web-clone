import {Observable} from 'rxjs/Observable';
import {UserState} from './user.state';
import {UserStates} from './user.states';
import {CredentialState} from './credential.state';
import {OrganizationState} from './organization.state';
import {OrganizationStates} from './organization.states';
import {AccountResponse} from '../../parties/account.response';
import {AccessRoleState} from '../access-roles/access.role.state';
import {PartyAccessRoleState} from './party.access.role.state';
import {PhotoState} from './photo.state';
import {UserResponse} from '../../parties/user.response';

export abstract class PersonClient {

  public abstract findAccessRole(searchStr: string, pageSize: number): Observable<AccessRoleState[]>;
  public abstract logOutUser(): Observable<boolean>;
  public abstract getPartyId(): Observable<string>;
  public abstract getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<UserStates>;
  public abstract getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<OrganizationStates>;

  public abstract getPartyAccessRoleById(partyId: string): Observable<PartyAccessRoleState[]>;
  public abstract getPartyAccessRoles(): Observable<PartyAccessRoleState[]>;


  public abstract getUserState(partyId: string): Observable<UserResponse>;
  public abstract getOrganizationState(partyId: string): Observable<OrganizationState>;

  public abstract getPhoto(partyId: string, type: string): Observable<PhotoState>;

  public abstract addUserState(userState: UserState, partyAccessRoleStates: PartyAccessRoleState[]): Observable<UserState>;
  public abstract addOrganizationState(organizationState: OrganizationState): Observable<OrganizationState>;
  public abstract addPhoto(photoState: PhotoState, type: string): Observable<PhotoState>;
  public abstract addAccountState(userState: UserState, organizationState: OrganizationState): Observable<AccountResponse>;

  public abstract deleteUser(partyId: string): Observable<number>;
  public abstract deleteOrganization(partyId: string): Observable<number>;

  public abstract updateUser(userState: UserState, partyAccessRoleState: PartyAccessRoleState[]): Observable<number>;
  public abstract updateUserMe(userState: UserState, credentialState: CredentialState): Observable<number>;
  public abstract updateOrganization(organizationState: OrganizationState): Observable<number>;
  public abstract updateCredential(credentialState: CredentialState): Observable<number>;

  public abstract updatePhoto(partyId: string, photoState: PhotoState, type: string): Observable<number>;

  // authentication part
  abstract isValidUsername(username: string, partyId?: string): Observable<boolean>;

  abstract isValidPassword(password: string): Observable<boolean>;
}
