import {Session} from "./session";
import {Observable} from "rxjs/Observable";
import {Cookie} from "ng2-cookies/ng2-cookies";
import {AuthenticationRepository} from "./authentication.repository";
import {Credential} from "./credential";

export class AuthenticationService {

  private sessionIdName:string = "troumaca-session-id";
  private rememberMeName:string = "troumaca-remember-me";

  constructor(private authenticationRepository: AuthenticationRepository) {
  }

  public isValidUsername(username:string):Observable<boolean> {
    return this.authenticationRepository.isValidUsername(username);
  }

  public isValidEditUsername(partyId: string, username:string):Observable<boolean> {
    return this.authenticationRepository.isValidEditUsername(partyId, username);
  }

  public isValidCurrentPassword(password: string): Observable<boolean> {
    return this.authenticationRepository.isValidCurrentPassword(password);
  }

  public isValidPassword(password:string):Observable<boolean> {
    return this.authenticationRepository.isValidPassword(password);
  }

  public authenticate(credential:Credential):Observable<Session> {
    let that = this;
    return this
    .authenticationRepository
    .authenticate(credential)
    .map(session => {
      Cookie.set(that.sessionIdName, session.sessionId);
      if (credential.rememberMe) {
        Cookie.set(this.rememberMeName, String(credential.rememberMe));
      }
      return session;
    });
  }

  public forgotPassword(username: string):Observable<boolean> {
    return this.authenticationRepository.forgotPassword(username);
  }

  public addCredential(credential:Credential):Observable<Credential> {
    return this.authenticationRepository.addCredential(credential);
  }

}
