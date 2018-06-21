import {AppConfig} from '../../app.config';
import {UUIDGenerator} from '../../uuid.generator';
import {AssetClient} from './asset.client';
import {AssetClientHttp} from './asset.client.http';
// import {AssetClientMock} from "./asset.client.mock";
import {HttpClient} from '@angular/common/http';

export function assetClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator, httpClient: HttpClient): AssetClient {
  // var assetClient: AssetClient;
  // if (appConfig.remoteEndPoints) {
  //   assetClient = new AssetClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
  // } else {
  //   assetClient = new AssetClientMock();
  // }
  return new AssetClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let assetClientProvider = {
  provide: AssetClient,
  useFactory: assetClientFactory,
  deps: [AppConfig, UUIDGenerator, HttpClient]
};
