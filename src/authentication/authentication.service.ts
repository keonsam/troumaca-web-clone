import {Observable} from 'rxjs/Observable';
import {AuthenticationRepository} from './authentication.repository';
import {Credential} from './credential';
import {CredentialConfirmation} from './credential.confirmation';
import {Result} from '../result/result.success';
import {AuthenticateResponse} from './authenticate.response';
import {ValidResp} from "./resp.valid";
import { Confirmation } from "./confirmation";

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

  public authenticate(credential: Credential): Observable<AuthenticateResponse> {
    //let that = this;
    return this
    .authenticationRepository
    .authenticate(credential)
    .map(authenticateResponse => {
      // TODO: I believe this needs changing
      /*if(authenticateResponse.session) {
        Cookie.set(that.sessionIdName, authenticateResponse.session.sessionId);
        if (authenticateResponse.credential.rememberMe) {
          Cookie.set(that.rememberMeName, String(authenticateResponse.credential.rememberMe));
        }
      }*/
      return authenticateResponse;
    });
  }

  public forgotPassword(username: string): Observable<boolean> {
    return this.authenticationRepository.forgotPassword(username);
  }

  public addCredential(credential: Credential): Observable<Confirmation> {
    return this.authenticationRepository.addCredential(credential);
  }

  public verifyConfirmation(confirmation: Confirmation): Observable<Result<Confirmation>> {
    return this.authenticationRepository.verifyConfirmation(confirmation);
  }

  public resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Result<Confirmation>> {
    return this.authenticationRepository.resendConfirmationCode(confirmationId, credentialId);
  }

  public getConfirmationsUsername(confirmationId: string): Observable<string> {
    return this.authenticationRepository.getConfirmationsUsername(confirmationId);
  }

}
