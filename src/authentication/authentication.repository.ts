import {Session} from "./session";
import {Credential} from "./credential";
import {Observable} from "rxjs/Observable";
import {CredentialConfirmation} from "./credential.confirmation";

export abstract class AuthenticationRepository {
  abstract authenticate(credential:Credential):Observable<Session>;
  abstract authenticateSMSCode(credentialConformationId: string, smsCode:string):Observable<boolean>;
  abstract authenticateEmailCode(emailUUID: string, emailCode: string): Observable<boolean>;
  abstract forgotPassword(username: string):Observable<boolean>;
  abstract isValidUsername(username: string):Observable<boolean>;
  abstract isValidEditUsername(partyId: string, username: string):Observable<boolean>;
  abstract isValidCurrentPassword(password: string): Observable<boolean>;
  abstract isValidPassword(password: string):Observable<boolean>;
  abstract addCredential(credential:Credential):Observable<CredentialConfirmation>;
  abstract sendPhoneCode(phoneUUID: string): Observable<number>;
  abstract newPhoneUUID(phoneNumber: string): Observable<string>;
  abstract sendEmailCode(emailUUID: string): Observable<number>;
  abstract newEmailUUID(emailAddress: string): Observable<string>;

}
