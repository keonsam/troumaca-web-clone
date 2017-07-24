import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {LoginClient} from "./login.client";
import {LoginClientHttp} from "./login.client.http";
import {LoginClientMock} from "./login.client.mock";

export function loginClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator):LoginClient {
  var menuClient: LoginClient;
  if (appConfig.remoteEndPoints) {
    menuClient = new LoginClientHttp(uuidGenerator);
  } else {
    menuClient = new LoginClientMock();
  }
  return menuClient;
}

export let loginClientProvider = {
  provide: LoginClient,
  useFactory: loginClientFactory,
  deps: [AppConfig, UUIDGenerator]
};