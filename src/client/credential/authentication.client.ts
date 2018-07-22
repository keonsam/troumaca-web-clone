import {Observable} from 'rxjs/Observable';
import {CredentialState} from './credential.state';
import {CredentialConfirmationState} from './credential.confirmation.state';
import {Result} from '../../result/result.success';
import {AuthenticateResponse} from '../../authentication/authenticate.response';
import {ValidResp} from "../../authentication/resp.valid";
import {ConfirmationState} from "./confirmation.state";

export abstract class AuthenticationClient {

  abstract authenticate(credentialState: CredentialState): Observable<AuthenticateResponse>;

  abstract forgotPassword(username: string): Observable<boolean>;

  abstract isValidPassword(password: string): Observable<ValidResp>;

  abstract isValidUsername(username: string): Observable<ValidResp>;

  abstract addCredential(credential: CredentialState): Observable<ConfirmationState>;

  abstract verifyConfirmationState(conformationState: ConfirmationState): Observable<Result<ConfirmationState>>;

  abstract resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Result<ConfirmationState>>;

  abstract getConfirmationsUsername(credentialConfirmationId: string): Observable<string>;

}
