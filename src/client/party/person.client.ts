import {Observable} from "rxjs/Observable";
import {UserState} from "./user.state";
import {UserStates} from "./user.states";
import {CredentialState} from "./credential.state";
import {OrganizationState} from "./organization.state";
import {OrganizationStates} from "./organization.states";
import {AccountResponse} from "../../parties/account.response";
import {AccessRoleState} from "../access-roles/access.role.state";
import {PartyAccessRoleState} from "./party.access.role.state";

export abstract class PersonClient {

  public abstract findAccessRole(searchStr: string, pageSize: number): Observable<AccessRoleState[]>;
  public abstract logOutUser(): Observable<boolean>;
  public abstract getPartyId(): Observable<string>;
  public abstract getUsers(pageNumber:number, pageSize:number, sortOrder:string):Observable<UserStates>;
  public abstract getOrganizations(pageNumber:number, pageSize:number, sortOrder:string):Observable<OrganizationStates>;

  public abstract getPartyAccessRoleById(partyId: string): Observable<PartyAccessRoleState>;
  public abstract getPartyAccessRoles() :Observable<PartyAccessRoleState[]>;


  public abstract getUserState(partyId: string): Observable<UserState>;
  public abstract getOrganizationState(partyId: string): Observable<OrganizationState>;

  public abstract getPhoto(partyId: string, type:string): Observable<string>;

  public abstract addUserState(userState: UserState, partyAccessRoleState:PartyAccessRoleState): Observable<UserState>;
  public abstract addOrganizationState(organizationState: OrganizationState): Observable<OrganizationState>;
  public abstract addPhoto(partyId: string, croppedImage:string, type:string): Observable<boolean>;
  public abstract addAccountState(accountType:string, userState: UserState, organizationState: OrganizationState): Observable<AccountResponse>;

  public abstract deleteUser(partyId: string): Observable<number>;
  public abstract deleteOrganization(partyId: string): Observable<number>;

  public abstract updateUser(userState: UserState, partyAccessRoleState:PartyAccessRoleState): Observable<number>;
  public abstract updateUserMe(userState: UserState, credentialState:CredentialState): Observable<number>;
  public abstract updateOrganization(organizationState: OrganizationState): Observable<number>;
  public abstract updateCredential(credentialState: CredentialState): Observable<number>;

  public abstract updatePhoto(partyId: string, croppedImage:string, type: string): Observable<number>;

  // authentication part
  abstract isValidPassword(password: string): Observable<boolean>;

  abstract isValidUsername(username: string): Observable<boolean>;

  abstract isValidEditUsername(partyId: string, username: string): Observable<boolean>;
}
