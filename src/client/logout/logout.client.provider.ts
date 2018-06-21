import {AppConfig} from '../../app.config';
import {UUIDGenerator} from '../../uuid.generator';
import {LogoutClient} from './logout.client';
import {LogoutClientHttp} from './logout.client.http';
import {LogoutClientMock} from './logout.client.mock';

export function logoutClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator): LogoutClient {
  let logoutClient: LogoutClient;
  if (appConfig.remoteEndPoints) {
    logoutClient = new LogoutClientHttp(uuidGenerator);
  } else {
    logoutClient = new LogoutClientMock();
  }
  return logoutClient;
}

export let logoutClientProvider = {
  provide: LogoutClient,
  useFactory: logoutClientFactory,
  deps: [AppConfig, UUIDGenerator]
};
