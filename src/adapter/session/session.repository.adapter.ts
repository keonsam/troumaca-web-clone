import {SessionClient} from '../../client/session/session.client';
import {Observable} from 'rxjs';
import {SessionRepository} from '../../session/session.repository';
import {map} from "rxjs/operators";

export class SessionRepositoryAdapter extends SessionRepository {

  constructor(private sessionClient: SessionClient) {
    super();
  }

  logout(): Observable<boolean> {
    return this.sessionClient.logout();
  }

  activeSessionExists(): Observable<boolean> {
    return this.sessionClient.isValidSession()
      .pipe( map( value => value.valid));
  }

}
