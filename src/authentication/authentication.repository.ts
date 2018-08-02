import {Credential} from './credential';
import {Observable} from 'rxjs/Observable';
import {ValidResp} from "./resp.valid";
import { Confirmation } from "./confirmation";
import {AuthenticatedCredential} from "./authenticated.credential";

export abstract class AuthenticationRepository {
  abstract authenticate(credential: Credential): Observable<AuthenticatedCredential>;
  abstract forgotPassword(username: string): Observable<boolean>;
  abstract isValidUsername(username: string): Observable<ValidResp>;
  abstract isValidPassword(password: string): Observable<ValidResp>;
  abstract addCredential(credential: Credential): Observable<Confirmation>;
  abstract verifyConfirmation(conformation: Confirmation): Observable<Confirmation>;
  abstract resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Confirmation>;
  abstract getConfirmationsUsername(credentialConfirmationId: string): Observable<string>;
}
