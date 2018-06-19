import {AppConfig} from '../../app.config';
import {UUIDGenerator} from '../../uuid.generator';
import {UnitOfMeasureClient} from './unit.of.measure.client';
import {UnitOfMeasureClientHttp} from './unit.of.measure.client.http';
import {HttpClient} from '@angular/common/http';

export function unitOfMeasureClientFactory(appConfig: AppConfig, uuidGenerator: UUIDGenerator, httpClient: HttpClient): UnitOfMeasureClient {
  return new UnitOfMeasureClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let unitOfMeasureClientProvider = {
  provide: UnitOfMeasureClient,
  useFactory: unitOfMeasureClientFactory,
  deps: [AppConfig, UUIDGenerator, HttpClient]
};
