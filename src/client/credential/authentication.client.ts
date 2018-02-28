import {Observable} from "rxjs/Observable";
import {CredentialState} from "./credential.state";
import {Credential} from "../../authentication/credential";
import {SessionState} from "./session.state";

export abstract class AuthenticationClient {

  abstract authenticate(credentialState: CredentialState): Observable<SessionState>;

  abstract forgotPassword(emailOrPhone: string): Observable<boolean>;

  abstract isValidCurrentPassword(password: string): Observable<boolean>;

  abstract isValidPassword(password: string): Observable<boolean>;

  abstract isValidUsername(username: string): Observable<boolean>;

  abstract isValidEditUsername(partyId: string, username: string): Observable<boolean>;

  abstract addCredential(credential:CredentialState): Observable<CredentialState>;
}
