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

  getCredential(credentialId: string): Observable<User> {
    return this.authenticationRepository.getCredential(credentialId);
  }

  isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
    return this.authenticationRepository.isValidUsername(username, partyId);
  }

  isValidPassword(password: string): Observable<ValidResponse> {
    return this.authenticationRepository.isValidPassword(password);
  }

  authenticate(credential: Credential): Observable<AuthenticatedCredential> {
    return this
    .authenticationRepository.authenticate(credential);
  }

  forgotPassword(credential: Credential): Observable<Confirmation> {
    return this.authenticationRepository.forgotPassword(credential);
  }

  addCredential(credential: Credential, user: User): Observable<Confirmation> {
    return this.authenticationRepository.addCredential(credential, user);
  }

  verifyConfirmation(confirmation: Confirmation): Observable<Confirmation> {
    return this.authenticationRepository.verifyConfirmation(confirmation);
  }

  resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Confirmation> {
    return this.authenticationRepository.resendConfirmationCode(confirmationId, credentialId);
  }

  updateCredential(credential: Credential, user: User): Observable<number> {
    return this.authenticationRepository.updateCredential(credential, user);
  }

}
