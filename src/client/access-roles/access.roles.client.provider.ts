import {UUIDGenerator} from '../../uuid.generator';
import {AccessRolesClient} from './access.roles.client';
import {AccessRolesClientHttp} from './access.roles.client.http';
import {HttpClient} from '@angular/common/http';

export function accessRolesClientFactory (httpClient: HttpClient, uuidGenerator: UUIDGenerator): AccessRolesClient {
  return new AccessRolesClientHttp(httpClient, uuidGenerator);
}

export let accessRolesClientProvider = {
  provide: AccessRolesClient,
  useFactory: accessRolesClientFactory,
  deps: [HttpClient, UUIDGenerator]
};
