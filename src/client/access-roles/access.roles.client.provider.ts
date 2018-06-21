import {AppConfig} from '../../app.config';
import {UUIDGenerator} from '../../uuid.generator';
import {AccessRolesClient} from './access.roles.client';
import {AccessRolesClientHttp} from './access.roles.client.http';
import {HttpClient} from '@angular/common/http';

export function accessRolesClientFactory (appConfig: AppConfig, httpClient: HttpClient, uuidGenerator: UUIDGenerator): AccessRolesClient {
  return new AccessRolesClientHttp(httpClient, uuidGenerator, appConfig.apiEndpoint);
}

export let accessRolesClientProvider = {
  provide: AccessRolesClient,
  useFactory: accessRolesClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};
