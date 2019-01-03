import {Observable} from 'rxjs';
import {LobbyRepository} from '../../lobby/lobby.repository';
import {LobbyClient} from '../../client/lobby/lobby.client';
import {App} from "../../lobby/app";

export class LobbyRepositoryAdapter extends LobbyRepository {
  constructor(private lobbyClient: LobbyClient) {
    super();
  }

  getApps(): Observable<App[]> {
    return this.lobbyClient.getApps();
  }
}
