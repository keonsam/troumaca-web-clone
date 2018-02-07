import "rxjs/add/operator/map";
import {SessionRepository} from "../../security/session/session.repository";
import {SessionClient} from "../../client/session/session.client";
import {PartySessionRepository} from "../../parties/party.session.repository";
import {Observable} from "rxjs/Observable";
import {PartySession} from "../../parties/party.session";
import {mapObjectProps} from "../../mapper/object.property.mapper";

export class SessionRepositoryAdapter extends SessionRepository implements PartySessionRepository {

  constructor(private sessionClient: SessionClient) {
    super();
  }

  getSession(): Observable<PartySession> {
    return this.sessionClient.getSession()
      .map(session => {
        return mapObjectProps(session, new PartySession());
      });
  }

}