import {User} from "./user";
import {Users} from "./users";
import {Observable} from "rxjs/Observable";
import {Credential} from "./credential";
import {Organization} from "./organization";
import {Organizations} from "./organizations";
import {Account} from "./account";

export abstract class PartyRepository {
  abstract getUsers(pageNumber:number, pageSize:number, sortOrder:string):Observable<Users>;

  abstract getOrganizations(pageNumber:number, pageSize:number, sortOrder:string):Observable<Organizations>;


  abstract getUser(partyId: string): Observable<User>;

  abstract getOrganization(partyId: string): Observable<Organization>;

  abstract getPhoto(partyId: string): Observable<string>;

  abstract addUser(user: User): Observable<User>;

  abstract addOrganization(organization: Organization): Observable<Organization>;

  abstract addCredential(credential: Credential): Observable<Credential>;

  abstract addPhoto(partyId: string, croppedImage: string): Observable<any>;

  abstract addAccount(account: Account): Observable<Account>;

  abstract deleteUser(partyId: string): Observable<number>;

  abstract deleteOrganization(partyId: string): Observable<number>;

  abstract deleteCredential(partyId: string): Observable<number>;

  abstract updateUser(user: User): Observable<number>;

  abstract updateOrganization(organization: Organization): Observable<number>;

  abstract updateCredential(credential: Credential): Observable<number>;

  abstract updatePhoto(partyId: string, croppedImage: string): Observable<number>;

  // authentication part
  abstract isValidUsername(username: string):Observable<boolean>;

  abstract isValidPassword(password: string):Observable<boolean>;

  abstract isValidEditUsername(partyId: string, username: string):Observable<boolean>;
}
