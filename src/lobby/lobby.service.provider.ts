import {LobbyService } from './lobby.service';
import { LobbyRepository } from './lobby.repository';

export function lobbyServiceProviderFactory (lobbyRepository: LobbyRepository): LobbyService {
  let lobbyService: LobbyService;
  if (!lobbyService) {
    lobbyService = new LobbyService(lobbyRepository);
  }
  return lobbyService;
}

export let lobbyServiceProvider = {
  provide: LobbyService,
  useFactory: lobbyServiceProviderFactory,
  useClass: LobbyService,
  deps: [LobbyRepository]
};
