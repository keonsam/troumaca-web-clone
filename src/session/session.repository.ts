import {Observable} from 'rxjs/Observable';

export abstract class SessionRepository {
  abstract activeSessionExists(): Observable<boolean>;
}
