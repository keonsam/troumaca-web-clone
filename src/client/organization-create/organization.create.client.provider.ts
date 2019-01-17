import {UUIDGenerator} from '../../uuid.generator';
import {HttpClient} from '@angular/common/http';
import {OrganizationCreateClient} from "./organization.create.client";
import {OrganizationCreateClientHttp} from "./organization.create.client.http";

export function organizationCreateClientFactory (httpClient: HttpClient, uuidGenerator: UUIDGenerator): OrganizationCreateClient {
  return new OrganizationCreateClientHttp(uuidGenerator, httpClient);
}

export let organizationCreateClientProvider = {
  provide: OrganizationCreateClient,
  useFactory: organizationCreateClientFactory,
  deps: [HttpClient, UUIDGenerator]
};
