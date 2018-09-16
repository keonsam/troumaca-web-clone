import { UUIDGenerator} from '../../../uuid.generator';
import {AppConfig} from '../../../app.config';
import {HttpClient} from '@angular/common/http';
import { OrganizationClient } from './organization.client';
import { OrganizationClientHttp } from './organization.client.http';

export function organizationClientFactory (appConfig: AppConfig, httpClient: HttpClient, uuidGenerator: UUIDGenerator): OrganizationClient {
  return new OrganizationClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let organizationClientProvider = {
  provide: OrganizationClient,
  useFactory: organizationClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};
