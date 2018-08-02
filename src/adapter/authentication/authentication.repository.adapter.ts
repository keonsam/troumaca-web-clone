import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {AuthenticationClient} from '../../client/credential/authentication.client';
import {AuthenticationRepository} from '../../authentication/authentication.repository';
import {Credential} from '../../authentication/credential';
import {CredentialState} from '../../client/credential/credential.state';
import {ValidResp} from "../../authentication/resp.valid";
import { Confirmation } from "../../authentication/confirmation";
import { ConfirmationState } from "../../client/credential/confirmation.state";
import {AuthenticatedCredential} from "../../authentication/authenticated.credential";
import {AuthenticatedCredentialState} from "../../client/credential/authenticated.credential.state";

export class AuthenticationRepositoryAdapter extends AuthenticationRepository {

  constructor(private authenticationClient: AuthenticationClient) {
    super();
  }

  authenticate(credential: Credential): Observable<AuthenticatedCredential> {
    return this.authenticationClient.authenticate(mapObjectProps(credential, new CredentialState()))
      .map(authenticatedCredential => {
        return mapObjectProps(authenticatedCredential, new AuthenticatedCredentialState());
      });
  }

  forgotPassword(username: string): Observable<boolean> {
    return this.authenticationClient.forgotPassword(username);
  }

  isValidPassword(password: string): Observable<ValidResp> {
    return this.authenticationClient.isValidPassword(password);
  }

  isValidUsername(username: string): Observable<ValidResp> {
    return this.authenticationClient.isValidUsername(username);
  }

  addCredential(credential: Credential): Observable<Confirmation> {
    return this.authenticationClient
    .addCredential(mapObjectProps(credential, new CredentialState()))
    .map(confirmationState => {
      return mapObjectProps(confirmationState, new Confirmation());
    });
  }

  verifyConfirmation(confirmation: Confirmation): Observable<Confirmation> {
    return this.authenticationClient
    .verifyConfirmationState(mapObjectProps(confirmation, new ConfirmationState()))
    .map(result => {
     return mapObjectProps(result, new Confirmation());
    });
  }

  resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Confirmation> {
    return this.authenticationClient.resendConfirmationCode(confirmationId, credentialId)
    .map(result => {
      return mapObjectProps(result, new Confirmation());
    });
  }

  getConfirmationsUsername(credentialConfirmationId: string): Observable<string> {
    return this.authenticationClient.getConfirmationsUsername(credentialConfirmationId);
  }

}
