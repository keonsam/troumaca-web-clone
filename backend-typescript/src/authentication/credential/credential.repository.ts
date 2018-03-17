import {Observable} from "rxjs/Observable";
import {Credential} from './credential';

export interface CredentialRepository {

  isValidUsername(credential:Credential):Observable<boolean>;

  isValidPassword(credential:Credential):Observable<boolean>;

  getCredentialByUsername(username:string):Observable<Credential>;

  getCredentialByCredentialId(credentialId:string):Observable<Credential>;

  getSanitizeCredentialByUsername(credentialId:string):Observable<Credential>;

  checkUsernameValid(partyId:string, username:string):Observable<Credential>;

  addCredential(credential:Credential):Observable<Credential>;

  authenticateCredential(credential:Credential):Observable<Credential>;

  updateCredentialStatusById(credentialId:string, status:string):Observable<number>;

  updateCredentialPartyId(partyId: string, credentialId: string): Observable<number>;

}
