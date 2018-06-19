import {Observable} from 'rxjs/Observable';
import {CredentialState} from './credential.state';
import {CredentialConfirmationState} from './credential.confirmation.state';
import {Result} from '../../result/result.success';
import {AuthenticateResponse} from '../../authentication/authenticate.response';

export abstract class AuthenticationClient {

  abstract authenticate(credentialState: CredentialState): Observable<AuthenticateResponse>;

  abstract forgotPassword(username: string): Observable<boolean>;

  abstract isValidPassword(password: string): Observable<boolean>;

  abstract isValidUsername(username: string): Observable<boolean>;

  abstract addCredential(credential: CredentialState): Observable<CredentialConfirmationState>;

  abstract verifyCredentialConfirmationState(credentialConformationState: CredentialConfirmationState): Observable<Result<CredentialConfirmationState>>;

  abstract sendConfirmationCode(credentialConfirmationId: string): Observable<Result<CredentialConfirmationState>>;

  abstract getConfirmationsUsername(credentialConfirmationId: string): Observable<string>;

}
