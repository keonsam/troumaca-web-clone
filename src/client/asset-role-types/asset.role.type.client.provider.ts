import {HttpClient} from '@angular/common/http';
import {UUIDGenerator} from '../../uuid.generator';
import { AssetRoleTypeClient} from './asset.role.type.client';
import { AssetRoleTypeClientHttp} from './asset.role.type.client.http';

export function assetRoleTypeClientFactory (httpClient: HttpClient, uuidGenerator: UUIDGenerator): AssetRoleTypeClient {

  return new AssetRoleTypeClientHttp(uuidGenerator, httpClient);
}

export let assetRoleTypeClientProvider = {
  provide: AssetRoleTypeClient,
  useFactory: assetRoleTypeClientFactory,
  deps: [HttpClient, UUIDGenerator]
};
