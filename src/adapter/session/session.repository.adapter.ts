import {SessionClient} from '../../client/session/session.client';
import {PartySessionRepository} from '../../parties/party.session.repository';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {PartySession} from '../../parties/party.session';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {SessionRepository} from '../../session/session.repository';

export class SessionRepositoryAdapter extends SessionRepository implements PartySessionRepository {

  constructor(private sessionClient: SessionClient) {
    super();
  }

  getSession(): Observable<PartySession> {
    return this.sessionClient.getSession()
      .pipe(map(session => {
        return mapObjectProps(session, new PartySession());
      }));
  }


  activeSessionExists(): Observable<boolean> {
    return this.sessionClient.activeSessionExists();
  }

}
