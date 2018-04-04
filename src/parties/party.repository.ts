import {User} from "./user";
import {Users} from "./users";
import {Observable} from "rxjs/Observable";
import {Credential} from "./credential";
import {Organization} from "./organization";
import {Organizations} from "./organizations";
import {AccountResponse} from "./account.response";

export abstract class PartyRepository {

  abstract logOutUser(): Observable<boolean>;

  abstract getPartyId(): Observable<string>;
  abstract getUsers(pageNumber:number, pageSize:number, sortOrder:string):Observable<Users>;

  abstract getOrganizations(pageNumber:number, pageSize:number, sortOrder:string):Observable<Organizations>;

  abstract getUser(partyId: string): Observable<User>;

  abstract getOrganization(partyId: string): Observable<Organization>;

  abstract getPhoto(partyId: string): Observable<string>;

  abstract addUser(user: User): Observable<User>;

  abstract addOrganization(organization: Organization): Observable<Organization>;

  abstract addPhoto(partyId: string, croppedImage: string): Observable<any>;

  abstract addAccount(accountType: string, user: User, organization: Organization): Observable<AccountResponse>;

  abstract deleteUser(partyId: string): Observable<number>;

  abstract deleteOrganization(partyId: string): Observable<number>;

  abstract updateUser(user: User): Observable<number>;

  abstract updateOrganization(organization: Organization): Observable<number>;

  abstract updateCredential(credential: Credential): Observable<number>;

  abstract updatePhoto(partyId: string, croppedImage: string): Observable<number>;

  // authentication part
  abstract isValidUsername(username: string):Observable<boolean>;

  abstract isValidPassword(password: string):Observable<boolean>;

  abstract isValidEditUsername(partyId: string, username: string):Observable<boolean>;
}
