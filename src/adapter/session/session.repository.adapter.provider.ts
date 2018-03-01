import {SessionRepositoryAdapter} from "./session.repository.adapter";
import {SessionClient} from "../../client/session/session.client";
import {SessionRepository} from "../../session/session.repository";

export function sessionRepositoryProviderFactory (sessionClient:SessionClient):SessionRepository {
  let sessionRepositoryAdapter: SessionRepositoryAdapter;
  if (!sessionRepositoryAdapter) {
    sessionRepositoryAdapter = new SessionRepositoryAdapter(sessionClient);
  }
  return sessionRepositoryAdapter;
}

export let sessionRepositoryProvider = {
  provide: SessionRepository,
  useFactory: sessionRepositoryProviderFactory,
  deps: [SessionClient]
};