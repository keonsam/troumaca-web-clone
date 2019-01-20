import { UUIDGenerator} from '../../../uuid.generator';
import {HttpClient} from '@angular/common/http';
import { OrganizationClient } from './organization.client';
import { OrganizationClientHttp } from './organization.client.http';

export function organizationClientFactory (httpClient: HttpClient, uuidGenerator: UUIDGenerator): OrganizationClient {
  return new OrganizationClientHttp(uuidGenerator, httpClient);
}

export let organizationClientProvider = {
  provide: OrganizationClient,
  useFactory: organizationClientFactory,
  deps: [HttpClient, UUIDGenerator]
};
