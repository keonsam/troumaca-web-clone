import {Observable} from "rxjs/Observable";
import {Session} from "../../authentication/session";
import "rxjs/add/operator/map";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AuthenticationClient} from "../../client/credential/authentication.client";
import {AuthenticationRepository} from "../../authentication/authentication.repository";
import {Credential} from "../../authentication/credential";
import {CredentialState} from "../../client/credential/credential.state";
import {CredentialConfirmation} from "../../authentication/credential.confirmation";
import {CredentialConfirmationState} from "../../client/credential/credential.confirmation.state";
import {Result} from "../../result/result.success";
import {AuthenticateResponse} from "../../authentication/authenticate.response";

export class AuthenticationRepositoryAdapter extends AuthenticationRepository {

  constructor(private authenticationClient: AuthenticationClient) {
    super();
  }

  authenticate(credential: Credential): Observable<AuthenticateResponse> {
    return this.authenticationClient.authenticate(mapObjectProps(credential, new CredentialState()));
  }

  forgotPassword(username: string): Observable<boolean> {
    return this.authenticationClient.forgotPassword(username);
  }

  isValidPassword(password: string): Observable<boolean> {
    return this.authenticationClient.isValidPassword(password);
  }

  isValidUsername(username: string): Observable<boolean> {
    return this.authenticationClient.isValidUsername(username);
  }

  addCredential(credential:Credential):Observable<CredentialConfirmation> {
    return this.authenticationClient
    .addCredential(mapObjectProps(credential, new CredentialState()))
    .map(credentialState => {
      return mapObjectProps(credentialState, new CredentialConfirmation());
    });
  }

  verifyCredentialConfirmation(credentialConfirmation: CredentialConfirmation): Observable<Result<CredentialConfirmation>> {
    return this.authenticationClient
    .verifyCredentialConfirmationState(mapObjectProps(credentialConfirmation, new CredentialConfirmationState()))
    .map(result => {
     return mapObjectProps(result, new Result<CredentialConfirmation>());
    });
  }

  sendConfirmationCode(credentialConfirmationId: string): Observable<Result<CredentialConfirmation>> {
    return this.authenticationClient.sendConfirmationCode(credentialConfirmationId)
    .map(result => {
      return mapObjectProps(result, new Result<CredentialConfirmation>());
    });
  }

  getConfirmationsUsername(credentialConfirmationId: string): Observable<string> {
    return this.authenticationClient.getConfirmationsUsername(credentialConfirmationId);
  }

}
