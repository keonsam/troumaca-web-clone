import {UserClient} from './user.client';
import {UUIDGenerator} from '../../../uuid.generator';
import {AppConfig} from '../../../app.config';
import {UserClientHttp} from './user.client.http';
import {HttpClient} from '@angular/common/http';

export function userClientFactory (appConfig: AppConfig, httpClient: HttpClient, uuidGenerator: UUIDGenerator): UserClient {
  return new UserClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let userClientProvider = {
  provide: UserClient,
  useFactory: userClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};
