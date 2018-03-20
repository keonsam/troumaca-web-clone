import {Observable} from "rxjs/Observable";
import {CredentialState} from "./credential.state";
import {CredentialConfirmationState} from "./credential.confirmation.state";
import {Result} from "../../result/result.success";
import {AuthenticateResponseState} from "./authenticate.response.state";

export abstract class AuthenticationClient {

  abstract authenticate(credentialState: CredentialState): Observable<AuthenticateResponseState>;

  abstract forgotPassword(username: string): Observable<boolean>;

  abstract isValidPassword(password: string): Observable<boolean>;

  abstract isValidUsername(username: string): Observable<boolean>;

  abstract addCredential(credential:CredentialState): Observable<CredentialConfirmationState>;

  abstract verifyCredentialConfirmationState(credentialConformationState: CredentialConfirmationState): Observable<Result<CredentialConfirmationState>>;

  abstract sendConfirmationCode(credentialConfirmationId: string, type: string): Observable<Result<CredentialConfirmationState>>;

}
