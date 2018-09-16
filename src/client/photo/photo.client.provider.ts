import {PhotoClient} from './photo.client';
import {UUIDGenerator} from '../../uuid.generator';
import {AppConfig} from '../../app.config';
import {PhotoClientHttp} from './photo.client.http';
import {HttpClient} from '@angular/common/http';

export function photoClientFactory (appConfig: AppConfig, httpClient: HttpClient, uuidGenerator: UUIDGenerator): PhotoClient {
  return new PhotoClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let photoClientProvider = {
  provide: PhotoClient,
  useFactory: photoClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};
