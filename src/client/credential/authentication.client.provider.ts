import {UUIDGenerator} from '../../uuid.generator';
import {AuthenticationClient} from './authentication.client';
import {AuthenticationClientHttp} from './authentication.client.http';
import {HttpClient} from '@angular/common/http';

export function authenticationClientFactory (httpClient: HttpClient, uuidGenerator: UUIDGenerator): AuthenticationClient {
  return new AuthenticationClientHttp(uuidGenerator, httpClient);
}

export let authenticationClientProvider = {
  provide: AuthenticationClient,
  useFactory: authenticationClientFactory,
  deps: [HttpClient, UUIDGenerator]
};
