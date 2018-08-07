import {AppConfig} from '../../app.config';
import {UUIDGenerator} from '../../uuid.generator';
import {DepreciationClient} from './depreciation.client';
import {DepreciationClientHttp} from './depreciation.client.http';
import {HttpClient} from '@angular/common/http';

export function depreciationClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator, httpClient: HttpClient): DepreciationClient {
  return new DepreciationClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let depreciationClientProvider = {
  provide: DepreciationClient,
  useFactory: depreciationClientFactory,
  deps: [AppConfig, UUIDGenerator, HttpClient]
};
