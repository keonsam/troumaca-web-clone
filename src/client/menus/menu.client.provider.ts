import {MenuClient} from './menu.client';
import {UUIDGenerator} from '../../uuid.generator';
import {MenuClientHttp} from './menu.client.http';
import {HttpClient} from "@angular/common/http";

export function menuClientFactory (uuidGenerator: UUIDGenerator, httpClient: HttpClient): MenuClient {
  return new MenuClientHttp(uuidGenerator, httpClient);
}

export let menuClientProvider = {
  provide: MenuClient,
  useFactory: menuClientFactory,
  deps: [UUIDGenerator, HttpClient]
};
