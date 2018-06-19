import {AppConfig} from '../../app.config';
import {UUIDGenerator} from '../../uuid.generator';
import {AccountClient} from './account.client';
import {AccountClientHttp} from './account.client.http';
import {AccountClientMock} from './account.client.mock';

export function accountClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator): AccountClient {
  let accountClient: AccountClient;
  if (appConfig.remoteEndPoints) {
    accountClient = new AccountClientHttp(uuidGenerator);
  } else {
    accountClient = new AccountClientMock();
  }
  return accountClient;
}

export let accountClientProvider = {
  provide: AccountClient,
  useFactory: accountClientFactory,
  deps: [AppConfig, UUIDGenerator]
};
