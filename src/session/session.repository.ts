import {Observable} from 'rxjs';

export abstract class SessionRepository {
  abstract activeSessionExists(): Observable<boolean>;
}
