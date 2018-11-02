import {Observable} from 'rxjs';
import { LobbyRepository } from './lobby.repository';
import {App} from "./app";
import {Subscription} from "./subscription";

export class LobbyService  {

  constructor(private lobbyRepository: LobbyRepository) {
  }

  getApps(): Observable<App[]> {
    return this.lobbyRepository.getApps();
  }

  addSubscription(subscription: Subscription): Observable<Subscription> {
    return this.lobbyRepository.addSubscription(subscription);
  }
}
