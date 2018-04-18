import {User} from "./user";
import {Users} from "./users";
import {Observable} from "rxjs/Observable";
import {Credential} from "./credential";
import {Organization} from "./organization";
import {Organizations} from "./organizations";
import {AccountResponse} from "./account.response";
import {PartyAccessRole} from "./party.access.role";
import {AccessRole} from "../access-roles/access.role";

export abstract class PartyRepository {

  abstract findAccessRole(searchStr: string, pageSize: number) :Observable<AccessRole[]>;
  abstract logOutUser(): Observable<boolean>;

  abstract getPartyId(): Observable<string>;
  abstract getUsers(pageNumber:number, pageSize:number, sortOrder:string):Observable<Users>;

  abstract getOrganizations(pageNumber:number, pageSize:number, sortOrder:string):Observable<Organizations>;

  abstract getUser(partyId: string): Observable<User>;

  abstract getPartyAccessRoleById(partyId:string): Observable<PartyAccessRole>;

  abstract getPartyAccessRoles() :Observable<PartyAccessRole[]>;

  abstract getOrganization(partyId: string): Observable<Organization>;

  abstract getPhoto(partyId: string, type:string): Observable<string>;

  abstract addUser(user: User, partyAccessRole: PartyAccessRole): Observable<User>;

  abstract addOrganization(organization: Organization): Observable<Organization>;

  abstract addPhoto(partyId: string, croppedImage: string, type: string): Observable<boolean>;

  abstract addAccount(accountType: string, user: User, organization: Organization): Observable<AccountResponse>;

  abstract deleteUser(partyId: string): Observable<number>;

  abstract deleteOrganization(partyId: string): Observable<number>;

  abstract updateUser(user: User, partyAccessRole: PartyAccessRole): Observable<number>;

  abstract updateUserMe(user: User, credential: Credential): Observable<number>;

  abstract updateOrganization(organization: Organization): Observable<number>;

  abstract updateCredential(credential: Credential): Observable<number>;

  abstract updatePhoto(partyId: string, croppedImage: string, type: string): Observable<number>;

  // authentication part
  abstract isValidUsername(username: string):Observable<boolean>;

  abstract isValidPassword(password: string):Observable<boolean>;

  abstract isValidEditUsername(partyId: string, username: string):Observable<boolean>;
}
