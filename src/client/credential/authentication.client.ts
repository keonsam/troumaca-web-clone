import {Observable} from "rxjs/Observable";
import {CredentialState} from "./credential.state";
import {SessionState} from "./session.state";
import {CredentialConfirmationState} from "./credential.confirmation.state";

export abstract class AuthenticationClient {

  abstract authenticate(credentialState: CredentialState): Observable<SessionState>;

  abstract forgotPassword(username: string): Observable<boolean>;

  abstract isValidPassword(password: string): Observable<boolean>;

  abstract isValidUsername(username: string): Observable<boolean>;

  abstract addCredential(credential:CredentialState): Observable<CredentialConfirmationState>;

  abstract verifyCredentialConfirmationState(credentialConformationState: CredentialConfirmationState): Observable<CredentialConfirmationState>;

  abstract sendConfirmationCode(credentialConfirmationId: string, type: string): Observable<CredentialConfirmationState>;

}
