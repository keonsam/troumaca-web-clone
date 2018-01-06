import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {SessionClient} from "./session.client";
import {SessionClientHttp} from "./session.client.http";
import {SessionClientMock} from "./session.client.mock";

export function sessionClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator):SessionClient {
  var sessionClient: SessionClient;
  if (appConfig.remoteEndPoints) {
    sessionClient = new SessionClientHttp(uuidGenerator);
  } else {
    sessionClient = new SessionClientMock(uuidGenerator);
  }
  return sessionClient;
}

export let sessionClientProvider = {
  provide: SessionClient,
  useFactory: sessionClientFactory,
  deps: [AppConfig, UUIDGenerator]
};