//import {Session} from "./session";
import {Credential} from './credential';
import {Observable} from 'rxjs/Observable';
import {CredentialConfirmation} from './credential.confirmation';
import {Result} from '../result/result.success';
import {AuthenticateResponse} from './authenticate.response';

export abstract class AuthenticationRepository {
  abstract authenticate(credential: Credential): Observable<AuthenticateResponse>;
  abstract forgotPassword(username: string): Observable<boolean>;
  abstract isValidUsername(username: string): Observable<boolean>;
  abstract isValidPassword(password: string): Observable<boolean>;
  abstract addCredential(credential: Credential): Observable<CredentialConfirmation>;
  abstract verifyCredentialConfirmation(credentialConformation: CredentialConfirmation): Observable<Result<CredentialConfirmation>>;
  abstract sendConfirmationCode(credentialConfirmationId: string): Observable<Result<CredentialConfirmation>>;
  abstract getConfirmationsUsername(credentialConfirmationId: string): Observable<string>;
}
