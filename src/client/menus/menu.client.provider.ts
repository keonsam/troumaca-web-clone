import {MenuClient} from './menu.client';
import {UUIDGenerator} from '../../uuid.generator';
import {AppConfig} from '../../app.config';
import {MenuClientHttp} from './menu.client.http';
import {MenuClientMock} from './menu.client.mock';

export function menuClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator): MenuClient {
  let menuClient: MenuClient;
  if (appConfig.remoteEndPoints) {
    menuClient = new MenuClientHttp(uuidGenerator);
  } else {
    menuClient = new MenuClientMock();
  }
  return menuClient;
}

export let menuClientProvider = {
  provide: MenuClient,
  useFactory: menuClientFactory,
  deps: [AppConfig, UUIDGenerator]
};
