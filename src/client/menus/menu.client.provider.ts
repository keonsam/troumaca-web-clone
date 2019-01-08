import {MenuClient} from './menu.client';
import {UUIDGenerator} from '../../uuid.generator';
import {AppConfig} from '../../app.config';
import {MenuClientHttp} from './menu.client.http';
import {HttpClient} from "@angular/common/http";

export function menuClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator, httpClient: HttpClient): MenuClient {
  return new MenuClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let menuClientProvider = {
  provide: MenuClient,
  useFactory: menuClientFactory,
  deps: [AppConfig, UUIDGenerator, HttpClient]
};
