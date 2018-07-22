//import {Session} from "./session";
import {Credential} from './credential';
import {Observable} from 'rxjs/Observable';
import {CredentialConfirmation} from './credential.confirmation';
import {Result} from '../result/result.success';
import {AuthenticateResponse} from './authenticate.response';
import {ValidResp} from "./resp.valid";
import { Confirmation } from "./confirmation";

export abstract class AuthenticationRepository {
  abstract authenticate(credential: Credential): Observable<AuthenticateResponse>;
  abstract forgotPassword(username: string): Observable<boolean>;
  abstract isValidUsername(username: string): Observable<ValidResp>;
  abstract isValidPassword(password: string): Observable<ValidResp>;
  abstract addCredential(credential: Credential): Observable<Confirmation>;
  abstract verifyConfirmation(conformation: Confirmation): Observable<Result<Confirmation>>;
  abstract resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Result<Confirmation>>;
  abstract getConfirmationsUsername(credentialConfirmationId: string): Observable<string>;
}
