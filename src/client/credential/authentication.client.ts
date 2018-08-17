import {Observable} from 'rxjs/Observable';
import {CredentialState} from './credential.state';
import {ValidResp} from "../../authentication/resp.valid";
import {ConfirmationState} from "./confirmation.state";
import {AuthenticatedCredentialState} from "./authenticated.credential.state";

export abstract class AuthenticationClient {

  abstract authenticate(credentialState: CredentialState): Observable<AuthenticatedCredentialState>;

  abstract forgotPassword(username: string): Observable<boolean>;

  abstract isValidPassword(password: string): Observable<ValidResp>;

  abstract isValidUsername(username: string): Observable<ValidResp>;

  abstract addCredential(credential: CredentialState): Observable<ConfirmationState>;

  abstract verifyConfirmationState(conformationState: ConfirmationState): Observable<ConfirmationState>;

  abstract resendConfirmationCode(confirmationId: string, credentialId: string): Observable<ConfirmationState>;

  abstract getConfirmationsUsername(credentialConfirmationId: string): Observable<string>;

}
