import {PartyClient} from './party.client';
import {UUIDGenerator} from '../../uuid.generator';
import {AppConfig} from '../../app.config';
import {PartyClientHttp} from './party.client.http';
import {HttpClient} from '@angular/common/http';

export function partyClientFactory (appConfig: AppConfig, httpClient: HttpClient, uuidGenerator: UUIDGenerator): PartyClient {
  return new PartyClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let partyClientProvider = {
  provide: PartyClient,
  useFactory: partyClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};
