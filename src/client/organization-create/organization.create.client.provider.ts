import {UUIDGenerator} from '../../uuid.generator';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {OrganizationCreateClient} from "./organization.create.client";
import {OrganizationCreateClientHttp} from "./organization.create.client.http";

export function organizationCreateClientFactory (appConfig: AppConfig, httpClient: HttpClient, uuidGenerator: UUIDGenerator): OrganizationCreateClient {
  return new OrganizationCreateClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let organizationCreateClientProvider = {
  provide: OrganizationCreateClient,
  useFactory: organizationCreateClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};
