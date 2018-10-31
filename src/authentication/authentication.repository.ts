import { Credential } from './credential';
import {Observable} from 'rxjs';
import { ValidResponse } from './valid.response';
import { Confirmation } from './confirmation';
import {AuthenticatedCredential} from './authenticated.credential';
import {User} from '../parties/user';

export abstract class AuthenticationRepository {
  abstract getCredential(credentialId: string): Observable<User>;
  abstract authenticate(credential: Credential): Observable<AuthenticatedCredential>;
  abstract forgotPassword(credential: Credential): Observable<Confirmation>;
  abstract isValidUsername(username: string, partyId?: string): Observable<ValidResponse>;
  abstract isValidPassword(password: string): Observable<ValidResponse>;
  abstract addCredential(credential: Credential, user: User): Observable<Confirmation>;
  abstract verifyConfirmation(conformation: Confirmation): Observable<Confirmation>;
  abstract resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Confirmation>;
  abstract updateCredential(credential: Credential, user: User): Observable<number>;
}
