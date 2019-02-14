import {HttpClient} from '@angular/common/http';
import {UUIDGenerator} from '../../uuid.generator';
import { AssetNameTypeClient} from './asset.name.type.client';
import { AssetNameTypeClientHttp} from './asset.name.type.client.http';

export function assetNameTypeClientFactory (httpClient: HttpClient, uuidGenerator: UUIDGenerator): AssetNameTypeClient {

  return new AssetNameTypeClientHttp(uuidGenerator, httpClient);
}

export let assetNameTypeClientProvider = {
  provide: AssetNameTypeClient,
  useFactory: assetNameTypeClientFactory,
  deps: [HttpClient, UUIDGenerator]
};
