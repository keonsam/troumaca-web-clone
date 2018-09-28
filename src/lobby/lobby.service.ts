import {Observable} from 'rxjs';
import { LobbyRepository } from './lobby.repository';
import {Module} from "./module";
import {Subscription} from "./subscription";

export class LobbyService  {

  constructor(private lobbyRepository: LobbyRepository) {
  }

  getModules(): Observable<Module[]> {
    return this.lobbyRepository.getModules();
  }

  addSubscription(subscription: Subscription): Observable<Subscription> {
    return this.lobbyRepository.addSubscription(subscription);
  }
}
