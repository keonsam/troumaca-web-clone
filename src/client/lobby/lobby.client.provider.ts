import {AppConfig} from '../../app.config';
import {UUIDGenerator} from '../../uuid.generator';
import {HttpClient} from '@angular/common/http';
import { LobbyClient } from "./lobby.client";
import { LobbyClientHttp } from "./lobby.client.http";

export function lobbyClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator, httpClient: HttpClient): LobbyClient {
  return new LobbyClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let lobbyClientProvider = {
  provide: LobbyClient,
  useFactory: lobbyClientFactory,
  deps: [AppConfig, UUIDGenerator, HttpClient]
};
