import {Observable} from 'rxjs';
import {AuthenticationRepository} from './authentication.repository';
import { Credential } from './credential';
import { ValidResponse} from './valid.response';
import { Confirmation } from './confirmation';
import {AuthenticatedCredential} from './authenticated.credential';
import {User} from '../parties/user';

export class AuthenticationService {

  constructor(private authenticationRepository: AuthenticationRepository) {
  }

  public isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
    return this.authenticationRepository.isValidUsername(username, partyId);
  }

  public isValidPassword(password: string): Observable<ValidResponse> {
    return this.authenticationRepository.isValidPassword(password);
  }

  public authenticate(credential: Credential): Observable<AuthenticatedCredential> {
    return this
    .authenticationRepository.authenticate(credential);
  }

  public forgotPassword(username: string): Observable<boolean> {
    return this.authenticationRepository.forgotPassword(username);
  }

  public addCredential(credential: Credential, user: User): Observable<Confirmation> {
    return this.authenticationRepository.addCredential(credential, user);
  }

  public verifyConfirmation(confirmation: Confirmation): Observable<Confirmation> {
    return this.authenticationRepository.verifyConfirmation(confirmation);
  }

  public resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Confirmation> {
    return this.authenticationRepository.resendConfirmationCode(confirmationId, credentialId);
  }

}
