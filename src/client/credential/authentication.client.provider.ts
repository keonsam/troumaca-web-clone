import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {AuthenticationClient} from "./authentication.client";
import {AuthenticationClientHttp} from "./authentication.client.http";
import {AuthenticationClientMock} from "./authentication.client.mock";

export function authenticationClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator):AuthenticationClient {
  var authenticationClient: AuthenticationClient;
  if (appConfig.remoteEndPoints) {
    authenticationClient = new AuthenticationClientHttp(uuidGenerator);
  } else {
    authenticationClient = new AuthenticationClientMock(uuidGenerator);
  }
  return authenticationClient;
}

export let authenticationClientProvider = {
  provide: AuthenticationClient,
  useFactory: authenticationClientFactory,
  deps: [AppConfig, UUIDGenerator]
};