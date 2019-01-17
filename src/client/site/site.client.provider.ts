import {UUIDGenerator} from '../../uuid.generator';
import {SiteClient} from './site.client';
import {SiteClientHttp} from './site.client.http';
import {HttpClient} from '@angular/common/http';

export function siteClientFactory (httpClient: HttpClient, uuidGenerator: UUIDGenerator): SiteClient {
  return new SiteClientHttp(uuidGenerator, httpClient);
}

export let siteClientProvider = {
  provide: SiteClient,
  useFactory: siteClientFactory,
  deps: [HttpClient, UUIDGenerator]
};
