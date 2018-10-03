import {Observable} from 'rxjs';
import {CredentialState} from './credential.state';
import {ValidResp} from "../../authentication/resp.valid";
import {ConfirmationState} from "./confirmation.state";
import {AuthenticatedCredentialState} from "./authenticated.credential.state";
import {UserState} from "../party/user.state";

export abstract class AuthenticationClient {

  abstract authenticate(credentialState: CredentialState): Observable<AuthenticatedCredentialState>;
  abstract forgotPassword(username: string): Observable<boolean>;
  abstract isValidPassword(password: string): Observable<ValidResp>;
  abstract isValidUsername(username: string, partyId?: string): Observable<ValidResp>;
  abstract addCredential(credential: CredentialState, userState: UserState): Observable<ConfirmationState>;
  abstract verifyConfirmationState(conformationState: ConfirmationState): Observable<ConfirmationState>;
  abstract resendConfirmationCode(confirmationId: string, credentialId: string): Observable<ConfirmationState>;
}
