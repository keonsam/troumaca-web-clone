import {Observable} from "rxjs/Observable";
import {Session} from "../../authentication/session";
import "rxjs/add/operator/map";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AuthenticationClient} from "../../client/credential/authentication.client";
import {AuthenticationRepository} from "../../authentication/authentication.repository";
import {Credential} from "../../authentication/credential";
import {CredentialState} from "../../client/credential/credential.state";
import {SessionState} from "../../client/credential/session.state";
import {CredentialConfirmation} from "../../authentication/credential.confirmation";
import {CredentialConfirmationState} from "../../client/credential/credential.confirmation.state";

export class AuthenticationRepositoryAdapter extends AuthenticationRepository {

  constructor(private authenticationClient: AuthenticationClient) {
    super();
  }

  authenticate(credential: Credential): Observable<Session> {
    return this.authenticationClient
      .authenticate(mapObjectProps(credential, new CredentialState()))
      .map(sessionState => {
        return mapObjectProps(sessionState, new Session());
      });
  }

  forgotPassword(username: string): Observable<boolean> {
    //return undefined;
    throw new Error("Not Implemented.")
  }

  isValidCurrentPassword(password: string): Observable<boolean> {
    return this.authenticationClient.isValidCurrentPassword(password);
  }

  isValidPassword(password: string): Observable<boolean> {
    return this.authenticationClient.isValidPassword(password);
  }

  isValidUsername(username: string): Observable<boolean> {
    return this.authenticationClient.isValidUsername(username);
  }

  isValidEditUsername(partyId: string, username: string): Observable<boolean> {
    return this.authenticationClient.isValidEditUsername(partyId, username);
  }

  addCredential(credential:Credential):Observable<CredentialConfirmation> {
    return this.authenticationClient
    .addCredential(mapObjectProps(credential, new CredentialState()))
    .map(credentialState => {
      return mapObjectProps(credentialState, new CredentialConfirmation());
    });
  }

  verifyCredentialConfirmation(credentialConfirmation: CredentialConfirmation): Observable<CredentialConfirmation> {
    return this.authenticationClient
    .verifyCredentialConfirmationState(mapObjectProps(credentialConfirmation, new CredentialConfirmationState()))
    .map(credentialConfirmationState => {
      return mapObjectProps(credentialConfirmationState, new CredentialConfirmation());
    });
  }

  sendConfirmationCode(credentialConfirmationId: string, type: string): Observable<CredentialConfirmation> {
    return this.authenticationClient.sendConfirmationCode(credentialConfirmationId, type)
    .map(credentialConfirmationState => {
      return mapObjectProps(credentialConfirmationState, new CredentialConfirmation());
    });
  }

}
