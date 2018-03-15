import {PartyRepository} from "./party.repository";
import {Observable} from "rxjs/Observable";
import {User} from "./user";
import {Users} from "./users";
import {Credential} from "./credential";
import {Organization} from "./organization";
import {Organizations} from "./organizations";
import {Account} from "./account";

export class PartyService {

  constructor(private partyRepository: PartyRepository) {
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

  public getOrganization(partyId: string):Observable<Organization> {
    return this.partyRepository.getOrganization(partyId);
  }

  public getPhoto(partyId: string): Observable<string> {
    return this.partyRepository.getPhoto(partyId);
  }

  public addUser(user: User): Observable<User> {
    return this.partyRepository.addUser(user);
  }

  public addOrganization(organization: Organization): Observable<Organization> {
    return this.partyRepository.addOrganization(organization);
  }

  public addCredential(credential: Credential): Observable<Credential> {
    return this.partyRepository.addCredential(credential);
  }

  public addPhoto(partyId: string, croppedImage: string): Observable<any> {
    return this.partyRepository.addPhoto(partyId, croppedImage);
  }

  public addAccount(account: Account): Observable<Account> {
    return this.partyRepository.addAccount(account);
  }

  public deleteUser(partyId: string): Observable<number> {
    return this.partyRepository.deleteUser(partyId);
  }

  public deleteOrganization(partyId: string): Observable<number> {
    return this.partyRepository.deleteOrganization(partyId);
  }

  public deleteCredential(partyId: string): Observable<number> {
    return this.partyRepository.deleteCredential(partyId);
  }

  public updateUser(user: User): Observable<number> {
    return this.partyRepository.updateUser(user);
  }

  public updateOrganization(organization: Organization): Observable<number> {
    return this.partyRepository.updateOrganization(organization);
  }

  public updateCredential(credential: Credential): Observable<number> {
    return this.partyRepository.updateCredential(credential);
  }

  public updatePhoto(partyId: string, croppedImage: string): Observable<number> {
    return this.partyRepository.updatePhoto(partyId, croppedImage);
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
