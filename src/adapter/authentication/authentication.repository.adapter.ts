import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {AuthenticationClient} from '../../client/credential/authentication.client';
import {AuthenticationRepository} from '../../authentication/authentication.repository';
import {Credential} from '../../authentication/credential';
import {CredentialState} from '../../client/credential/credential.state';
import {CredentialConfirmation} from '../../authentication/credential.confirmation';
import {CredentialConfirmationState} from '../../client/credential/credential.confirmation.state';
import {Result} from '../../result/result.success';
import {AuthenticateResponse} from '../../authentication/authenticate.response';
import {ValidResp} from "../../authentication/resp.valid";
import { Confirmation } from "../../authentication/confirmation";
import { ConfirmationState } from "../../client/credential/confirmation.state";

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

  verifyConfirmation(confirmation: Confirmation): Observable<Result<Confirmation>> {
    return this.authenticationClient
    .verifyConfirmationState(mapObjectProps(confirmation, new ConfirmationState()))
    .map(result => {
     return mapObjectProps(result, new Result<Confirmation>());
    });
  }

  resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Result<Confirmation>> {
    return this.authenticationClient.resendConfirmationCode(confirmationId, credentialId)
    .map(result => {
      return mapObjectProps(result, new Result<Confirmation>());
    });
  }

  getConfirmationsUsername(credentialConfirmationId: string): Observable<string> {
    return this.authenticationClient.getConfirmationsUsername(credentialConfirmationId);
  }

}
