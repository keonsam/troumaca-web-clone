import {MenuClient} from "./menu.client";
import {UUIDGenerator} from "../../uuid.generator";
import {AppConfig} from "../../app.config";
import {MenuClientHttp} from "./menu.client.http";
import {MenuClientMock} from "./menu.client.mock";
import {Subject} from "rxjs/Subject";

export function menuClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator, loginSubject:Subject<boolean>):MenuClient {
  var menuClient: MenuClient;
  if (appConfig.remoteEndPoints) {
    menuClient = new MenuClientHttp(loginSubject, uuidGenerator);
  } else {
    menuClient = new MenuClientMock(loginSubject);
  }
  return menuClient;
}

export let menuClientProvider = {
  provide: MenuClient,
  useFactory: menuClientFactory,
  deps: [AppConfig, UUIDGenerator]
};