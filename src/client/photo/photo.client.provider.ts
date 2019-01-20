import {PhotoClient} from './photo.client';
import {UUIDGenerator} from '../../uuid.generator';
import {PhotoClientHttp} from './photo.client.http';
import {HttpClient} from '@angular/common/http';

export function photoClientFactory (httpClient: HttpClient, uuidGenerator: UUIDGenerator): PhotoClient {
  return new PhotoClientHttp(uuidGenerator, httpClient);
}

export let photoClientProvider = {
  provide: PhotoClient,
  useFactory: photoClientFactory,
  deps: [HttpClient, UUIDGenerator]
};
