import {Observable} from 'rxjs';
import { LobbyRepository } from './lobby.repository';
import {App} from "./app";

export class LobbyService  {

  constructor(private lobbyRepository: LobbyRepository) {
  }

  getApps(): Observable<App[]> {
    return this.lobbyRepository.getApps();
  }

}
