import { Observable } from 'rxjs';
import { ValidResponse } from '../../authentication/valid.response';
import { Credential } from '../../authentication/credential';
import { User } from '../../parties/user';
import { AuthenticatedCredential } from '../../authentication/authenticated.credential';
import { Confirmation } from '../../authentication/confirmation';

export abstract class AuthenticationClient {
  abstract getCredential(credentialId: string): Observable<User>;
  abstract authenticate(credentialState: Credential): Observable<AuthenticatedCredential>;
  abstract forgotPassword(credential: Credential): Observable<Confirmation>;
  abstract isValidPassword(password: string): Observable<ValidResponse>;
  abstract isValidUsername(username: string, partyId?: string): Observable<ValidResponse>;
  abstract addCredential(credential: Credential, userState: User): Observable<Confirmation>;
  abstract verifyConfirmationState(conformationState: Confirmation): Observable<Confirmation>;
  abstract resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Confirmation>;
  abstract updateCredential(credential: Credential, user: User): Observable<number>;
}
