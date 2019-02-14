import {HttpClient} from '@angular/common/http';
import {UUIDGenerator} from '../../uuid.generator';
import { BrandClient} from './brand.client';
import { BrandClientHttp} from './brand.client.http';

export function brandClientFactory (httpClient: HttpClient, uuidGenerator: UUIDGenerator): BrandClient {

  return new BrandClientHttp(uuidGenerator, httpClient);
}

export let brandClientProvider = {
  provide: BrandClient,
  useFactory: brandClientFactory,
  deps: [HttpClient, UUIDGenerator]
};
