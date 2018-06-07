import {PartyRepository} from "./party.repository";
import {Observable} from "rxjs/Observable";
import {User} from "./user";
import {Users} from "./users";
import {Credential} from "./credential";
import {Organization} from "./organization";
import {Organizations} from "./organizations";
import {AccountResponse} from "./account.response";
import {PartyAccessRole} from "./party.access.role";
import {AccessRole} from "../access-roles/access.role";
import {Photo} from "./photo";

export class PartyService {

  constructor(private partyRepository: PartyRepository) {
  }

  public findAccessRole(searchStr: string, pageSize: number) :Observable<AccessRole[]> {
    return this.partyRepository.findAccessRole(searchStr, pageSize);
  }

  public logOutUser(): Observable<boolean> {
    return this.partyRepository.logOutUser();
  }

  public getPartyId(): Observable<string> {
    return this.partyRepository.getPartyId();
  }

  public getUsers(pageNumber:number, pageSize:number, sortOrder:string):Observable<Users> {
    return this.partyRepository.getUsers(pageNumber, pageSize, sortOrder);
  }

  public getOrganizations(pageNumber:number, pageSize:number, sortOrder:string):Observable<Organizations> {
    return this.partyRepository.getOrganizations(pageNumber, pageSize, sortOrder);
  }

  public getUser(partyId: string):Observable<User> {
    return this.partyRepository.getUser(partyId);
  }

  public getPartyAccessRoleById(partyId:string) :Observable<PartyAccessRole[]> {
    return this.partyRepository.getPartyAccessRoleById(partyId);
  }

  public getPartyAccessRoles() :Observable<PartyAccessRole[]> {
    return this.partyRepository.getPartyAccessRoles();
  }

  public getOrganization(partyId: string):Observable<Organization> {
    return this.partyRepository.getOrganization(partyId);
  }

  public getPhoto(partyId: string, type: string): Observable<Photo> {
    return this.partyRepository.getPhoto(partyId, type);
  }

  public addUser(user: User, partyAccessRoles: PartyAccessRole[]): Observable<User> {
    return this.partyRepository.addUser(user, partyAccessRoles);
  }

  public addOrganization(organization: Organization): Observable<Organization> {
    return this.partyRepository.addOrganization(organization);
  }

  public addPhoto(partyId: string, photo: Photo, type: string): Observable<Photo> {
    return this.partyRepository.addPhoto(partyId, photo, type);
  }

  public addAccount(accountType:string, user:User, organization: Organization ): Observable<AccountResponse> {
    return this.partyRepository.addAccount(accountType, user, organization);
  }

  public deleteUser(partyId: string): Observable<number> {
    return this.partyRepository.deleteUser(partyId);
  }

  public deleteOrganization(partyId: string): Observable<number> {
    return this.partyRepository.deleteOrganization(partyId);
  }

  public updateUser(user: User, partyAccessRoles: PartyAccessRole[]): Observable<number> {
    return this.partyRepository.updateUser(user, partyAccessRoles);
  }

  public updateUserMe(user: User, credential: Credential): Observable<number> {
    return this.partyRepository.updateUserMe(user, credential);
  }

  public updateOrganization(organization: Organization): Observable<number> {
    return this.partyRepository.updateOrganization(organization);
  }

  public updateCredential(credential: Credential): Observable<number> {
    return this.partyRepository.updateCredential(credential);
  }

  public updatePhoto(partyId: string, photo: Photo, type: string): Observable<number> {
    return this.partyRepository.updatePhoto(partyId, photo, type);
  }

  // authentication part

  public isValidUsername(username:string):Observable<boolean> {
    return this.partyRepository.isValidUsername(username);
  }

  public isValidPassword(password:string):Observable<boolean> {
    return this.partyRepository.isValidPassword(password);
  }

  public isValidEditUsername(partyId: string, username:string):Observable<boolean> {
    return this.partyRepository.isValidEditUsername(partyId, username);
  }

}
