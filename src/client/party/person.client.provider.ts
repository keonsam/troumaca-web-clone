import {PersonClient} from "./person.client";
import {UUIDGenerator} from "../../uuid.generator";
import {AppConfig} from "../../app.config";
import {PersonClientHttp} from "./person.client.http";
import {PersonClientMock} from "./person.client.mock";

export function personClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator):PersonClient {
  var personClient: PersonClient;
  if (appConfig.remoteEndPoints) {
    personClient = new PersonClientHttp(uuidGenerator);
  } else {
    personClient = new PersonClientMock(uuidGenerator);
  }
  return personClient;
}

export let personClientProvider = {
  provide: PersonClient,
  useFactory: personClientFactory,
  deps: [AppConfig, UUIDGenerator]
};