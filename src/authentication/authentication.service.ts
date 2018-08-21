import {Observable} from 'rxjs';
import {AuthenticationRepository} from './authentication.repository';
import {Credential} from './credential';
import {ValidResp} from "./resp.valid";
import { Confirmation } from "./confirmation";
import {AuthenticatedCredential} from "./authenticated.credential";

export class AuthenticationService {

  private sessionIdName = 'troumaca-session-id';
  private rememberMeName = 'troumaca-remember-me';

  constructor(private authenticationRepository: AuthenticationRepository) {
  }

  public isValidUsername(username: string): Observable<ValidResp> {
    return this.authenticationRepository.isValidUsername(username);
  }

  public isValidPassword(password: string): Observable<ValidResp> {
    return this.authenticationRepository.isValidPassword(password);
  }

  public authenticate(credential: Credential): Observable<AuthenticatedCredential> {
    //let that = this;
    return this
    .authenticationRepository.authenticate(credential);
  }

  public forgotPassword(username: string): Observable<boolean> {
    return this.authenticationRepository.forgotPassword(username);
  }

  public addCredential(credential: Credential): Observable<Confirmation> {
    return this.authenticationRepository.addCredential(credential);
  }

  public verifyConfirmation(confirmation: Confirmation): Observable<Confirmation> {
    return this.authenticationRepository.verifyConfirmation(confirmation);
  }

  public resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Confirmation> {
    return this.authenticationRepository.resendConfirmationCode(confirmationId, credentialId);
  }

  public getConfirmationsUsername(confirmationId: string): Observable<string> {
    return this.authenticationRepository.getConfirmationsUsername(confirmationId);
  }

}
