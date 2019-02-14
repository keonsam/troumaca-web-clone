import {HttpClient} from '@angular/common/http';
import {UUIDGenerator} from '../../uuid.generator';
import { AssetIdentifierTypeClient} from './asset.identifier.type.client';
import { AssetIdentifierTypeClientHttp} from './asset.identifier.type.client.http';

export function assetIdentifierTypeClientFactory (httpClient: HttpClient, uuidGenerator: UUIDGenerator): AssetIdentifierTypeClient {

  return new AssetIdentifierTypeClientHttp(uuidGenerator, httpClient);
}

export let assetIdentifierTypeClientProvider = {
  provide: AssetIdentifierTypeClient,
  useFactory: assetIdentifierTypeClientFactory,
  deps: [HttpClient, UUIDGenerator]
};
