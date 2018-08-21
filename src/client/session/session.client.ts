import {Observable} from 'rxjs';
import {SessionState} from './session.state';

export abstract class SessionClient {
  public abstract get isLoggedIn(): Observable<boolean>;

  public abstract get partyIdExist(): Observable<boolean>;

  public abstract getSession(): Observable<SessionState>;

  public abstract activeSessionExists(): Observable<boolean>;
}
