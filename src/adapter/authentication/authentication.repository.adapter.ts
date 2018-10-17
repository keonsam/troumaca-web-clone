import {Observable} from 'rxjs';
import {AuthenticationClient} from '../../client/credential/authentication.client';
import {AuthenticationRepository} from '../../authentication/authentication.repository';
import { Credential } from "../../authentication/credential";
import { ValidResponse } from "../../authentication/valid.response";
import { Confirmation } from "../../authentication/confirmation";
import {AuthenticatedCredential} from "../../authentication/authenticated.credential";
import {User} from "../../parties/user";

export class AuthenticationRepositoryAdapter extends AuthenticationRepository {

  constructor(private authenticationClient: AuthenticationClient) {
    super();
  }

  authenticate(credential: Credential): Observable<AuthenticatedCredential> {
    return this.authenticationClient.authenticate(credential);
  }

  forgotPassword(username: string): Observable<boolean> {
    return this.authenticationClient.forgotPassword(username);
  }

  isValidPassword(password: string): Observable<ValidResponse> {
    return this.authenticationClient.isValidPassword(password);
  }

  isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
    return this.authenticationClient.isValidUsername(username, partyId);
  }

  addCredential(credential: Credential, user: User): Observable<Confirmation> {
    return this.authenticationClient.addCredential(credential, user);
  }

  verifyConfirmation(confirmation: Confirmation): Observable<Confirmation> {
    return this.authenticationClient.verifyConfirmationState(confirmation);
  }

  resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Confirmation> {
    return this.authenticationClient.resendConfirmationCode(confirmationId, credentialId);
  }

}
