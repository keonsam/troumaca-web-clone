import {Observable} from 'rxjs';

export abstract class SessionRepository {
  abstract logout(): Observable<boolean>;
  abstract activeSessionExists(): Observable<boolean>;
}
