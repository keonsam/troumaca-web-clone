import {Observable} from 'rxjs';
import {ValidSession} from "../../session/valid.session";

export abstract class SessionClient {
  abstract get isLoggedIn(): Observable<boolean>;

  abstract logout(): Observable<boolean>;

  abstract isValidSession(): Observable<ValidSession>;
}
