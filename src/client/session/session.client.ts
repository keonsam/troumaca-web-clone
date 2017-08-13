import {Observable} from "rxjs/Observable";

export abstract class SessionClient {
  public abstract get isLoggedIn(): Observable<boolean>;
}