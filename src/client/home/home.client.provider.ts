import {AppConfig} from '../../app.config';
import {UUIDGenerator} from '../../uuid.generator';
import {HomeClient} from "./home.client";
import {HomeClientHttp} from "./home.client.http";
import {HttpClient} from '@angular/common/http';

export function homeClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator, httpClient: HttpClient): HomeClient {
  // var homeClient: HomeClient;
  // if (appConfig.remoteEndPoints) {
  //   homeClient = new HomeClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
  // } else {
  //   homeClient = new HomeClientMock();
  // }
  return new HomeClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let homeClientProvider = {
  provide: HomeClient,
  useFactory: homeClientFactory,
  deps: [AppConfig, UUIDGenerator, HttpClient]
};
