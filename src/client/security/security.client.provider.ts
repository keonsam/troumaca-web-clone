import {UUIDGenerator} from "../../uuid.generator";
import {AppConfig} from "../../app.config";
import {SecurityClient} from "./security.client";
import {SecurityClientHttp} from "./security.client.http";
import {SecurityClientMock} from "./security.client.mock";

export function securityClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator):SecurityClient {
  let securityClient: SecurityClient;
  if (appConfig.remoteEndPoints) {
    securityClient = new SecurityClientHttp(uuidGenerator);
  } else {
    securityClient = new SecurityClientMock(uuidGenerator);
  }
  return securityClient;
}

export let securityClientProvider = {
  provide: SecurityClient,
  useFactory: securityClientFactory,
  deps: [AppConfig, UUIDGenerator]
};