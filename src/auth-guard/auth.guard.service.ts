import {Observable} from "rxjs";
import {ValidSession} from "../session/valid.session";

export abstract class AuthGuardService {
  abstract isValidSession(): Observable<ValidSession>
}

