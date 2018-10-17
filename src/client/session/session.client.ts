import {Observable} from 'rxjs';
import {SessionState} from './session.state';
import {ValidSession} from "../../session/valid.session";

export abstract class SessionClient {
  public abstract get isLoggedIn(): Observable<boolean>;

  public abstract get partyIdExist(): Observable<boolean>;

  public abstract getSession(): Observable<SessionState>;

  public abstract activeSessionExists(): Observable<boolean>;

  abstract isValidSession(): Observable<ValidSession>;
}
