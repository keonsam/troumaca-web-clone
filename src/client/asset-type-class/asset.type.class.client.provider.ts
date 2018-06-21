import {AppConfig} from '../../app.config';
import {UUIDGenerator} from '../../uuid.generator';
import {AssetTypeClassClient} from './asset.type.class.client';
import {AssetTypeClassClientHttp} from './asset.type.class.client.http';
//import {AssetTypeClassClientMock} from "./asset.type.class.client.mock";
import {HttpClient} from '@angular/common/http';

export function assetTypeClassClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator, httpClient: HttpClient): AssetTypeClassClient {
  /*var assetTypeClassClient: AssetTypeClassClient;
  if (appConfig.remoteEndPoints) {
    assetTypeClassClient = new AssetTypeClassClientHttp(uuidGenerator);
  } else {
    assetTypeClassClient = new AssetTypeClassClientMock();
  }*/
  return new AssetTypeClassClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let assetTypeClassClientProvider = {
  provide: AssetTypeClassClient,
  useFactory: assetTypeClassClientFactory,
  deps: [AppConfig, UUIDGenerator, HttpClient]
};
