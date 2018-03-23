import {Session} from "./session";
import {Observable} from "rxjs/Observable";
import {Cookie} from "ng2-cookies/ng2-cookies";
import {AuthenticationRepository} from "./authentication.repository";
import {Credential} from "./credential";
import {CredentialConfirmation} from "./credential.confirmation";
import {Result} from "../result/result.success";
import {AuthenticateResponse} from "./authenticate.response";

export class AuthenticationService {

  private sessionIdName:string = "troumaca-session-id";
  private rememberMeName:string = "troumaca-remember-me";

  constructor(private authenticationRepository: AuthenticationRepository) {
  }

  public isValidUsername(username:string):Observable<boolean> {
    return this.authenticationRepository.isValidUsername(username);
  }

  public isValidPassword(password:string):Observable<boolean> {
    return this.authenticationRepository.isValidPassword(password);
  }

  public authenticate(credential:Credential):Observable<AuthenticateResponse> {
    let that = this;
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

  public forgotPassword(username: string):Observable<boolean> {
    return this.authenticationRepository.forgotPassword(username);
  }

  public addCredential(credential:Credential):Observable<CredentialConfirmation> {
    return this.authenticationRepository.addCredential(credential);
  }

  public verifyCredentialConfirmation(credentialConfirmation: CredentialConfirmation,): Observable<Result<CredentialConfirmation>>{
    return this.authenticationRepository.verifyCredentialConfirmation(credentialConfirmation);
  }

  public sendConfirmationCode(credentialConfirmationId: string, type: string): Observable<Result<CredentialConfirmation>> {
    return this.authenticationRepository.sendConfirmationCode(credentialConfirmationId, type);
  }

}
