import "rxjs/add/operator/map";
import {SessionRepository} from "../../security/session/session.repository";
import {SessionClient} from "../../client/sessions/session.client";

export class SessionRepositoryAdapter extends SessionRepository {

  constructor(private sessionClient: SessionClient) {
    super();
  }

}