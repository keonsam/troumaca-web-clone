import {UUIDGenerator} from '../../uuid.generator';
import {HttpClient} from '@angular/common/http';
import { LobbyClient } from "./lobby.client";
import { LobbyClientHttp } from "./lobby.client.http";

export function lobbyClientFactory (uuidGenerator: UUIDGenerator, httpClient: HttpClient): LobbyClient {
  return new LobbyClientHttp(uuidGenerator, httpClient);
}

export let lobbyClientProvider = {
  provide: LobbyClient,
  useFactory: lobbyClientFactory,
  deps: [UUIDGenerator, HttpClient]
};
