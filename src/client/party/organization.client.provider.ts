import {OrganizationClient} from './organization.client';
import {UUIDGenerator} from '../../uuid.generator';
import {AppConfig} from '../../app.config';
import {OrganizationClientHttp} from './organization.client.http';
import {HttpClient} from '@angular/common/http';

export function organizationClientFactory (appConfig: AppConfig, httpClient: HttpClient, uuidGenerator: UUIDGenerator): OrganizationClient {
  return new OrganizationClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let organizationClientProvider = {
  provide: OrganizationClient,
  useFactory: organizationClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};
