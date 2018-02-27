import {Observable} from "rxjs/Observable";
import {CredentialState} from "./credential.state";
import {SessionState} from "./session.state";

export abstract class AuthenticationClient {

  abstract authenticate(credential: CredentialState): Observable<SessionState>;

  abstract forgotPassword(emailOrPhone: string): Observable<boolean>;

  abstract isValidPassword(password: string): Observable<boolean>;

  abstract isValidUsername(username: string): Observable<boolean>;

  abstract addCredential(credential:CredentialState): Observable<CredentialState>;
}
