import { LobbyRepository } from "../../lobby/lobby.repository";
import { LobbyRepositoryAdapter} from "./lobby.repository.adapter";
import { LobbyClient } from "../../client/lobby/lobby.client";

export function lobbyRepositoryProviderFactory (lobbyClient: LobbyClient): LobbyRepository {
  let lobbyRepositoryAdapter: LobbyRepositoryAdapter;
  if (!lobbyRepositoryAdapter) {
    lobbyRepositoryAdapter = new LobbyRepositoryAdapter(lobbyClient);
  }
  return lobbyRepositoryAdapter;
}

export let lobbyRepositoryProvider = {
  provide: LobbyRepository,
  useFactory: lobbyRepositoryProviderFactory,
  deps: [LobbyClient]
};
