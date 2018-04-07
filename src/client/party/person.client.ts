import {Observable} from "rxjs/Observable";
import {UserState} from "./user.state";
import {UserStates} from "./user.states";
import {CredentialState} from "./credential.state";
import {OrganizationState} from "./organization.state";
import {OrganizationStates} from "./organization.states";
import {AccountResponse} from "../../parties/account.response";
import {AccessRoleState} from "./access.role.state";

export abstract class PersonClient {

  public abstract findAccessRole(searchStr: string, pageSize: number): Observable<AccessRoleState[]>;
  public abstract logOutUser(): Observable<boolean>;
  public abstract getPartyId(): Observable<string>;
  public abstract getUsers(pageNumber:number, pageSize:number, sortOrder:string):Observable<UserStates>;
  public abstract getOrganizations(pageNumber:number, pageSize:number, sortOrder:string):Observable<OrganizationStates>;

  public abstract getAccessRoleById(partyId: string): Observable<AccessRoleState>;
  public abstract getUserState(partyId: string): Observable<UserState>;
  public abstract getOrganizationState(partyId: string): Observable<OrganizationState>;

  public abstract getPhoto(partyId: string): Observable<string>;

  public abstract addUserState(userState: UserState, accessRoleId:string): Observable<UserState>;
  public abstract addOrganizationState(organizationState: OrganizationState): Observable<OrganizationState>;
  public abstract addPhoto(partyId: string, croppedImage:string): Observable<any>;
  public abstract addAccountState(accountType:string, userState: UserState, organizationState: OrganizationState): Observable<AccountResponse>;

  public abstract deleteUser(partyId: string): Observable<number>;
  public abstract deleteOrganization(partyId: string): Observable<number>;

  public abstract updateUser(userState: UserState, accessRoleId:string): Observable<number>;
  public abstract updateOrganization(organizationState: OrganizationState): Observable<number>;
  public abstract updateCredential(credentialState: CredentialState): Observable<number>;

  public abstract updatePhoto(partyId: string, croppedImage:string): Observable<number>;

  // authentication part
  abstract isValidPassword(password: string): Observable<boolean>;

  abstract isValidUsername(username: string): Observable<boolean>;

  abstract isValidEditUsername(partyId: string, username: string): Observable<boolean>;
}
