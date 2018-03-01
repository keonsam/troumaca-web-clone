import {Observable} from "rxjs/Observable";
import {SessionState} from "./session.state";

export abstract class SessionClient {
  public abstract get isLoggedIn(): Observable<boolean>;

  public abstract getSession(): Observable<SessionState>;

  public abstract activeSessionExists(): Observable<boolean>;
}
