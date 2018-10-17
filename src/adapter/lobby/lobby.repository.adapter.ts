import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {LobbyRepository} from '../../lobby/lobby.repository';
import {LobbyClient} from '../../client/lobby/lobby.client';
import {Module} from '../../lobby/module';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {Subscription} from "../../lobby/subscription";
import {SubscriptionState} from "../../client/lobby/subscription.state";

export class LobbyRepositoryAdapter extends LobbyRepository {
  constructor(private lobbyClient: LobbyClient) {
    super();
  }

  getModules(): Observable<Module[]> {
    return this.lobbyClient.getModules();
  }

  addSubscription(subscription: Subscription): Observable<Subscription> {
    return this.lobbyClient.addSubscription(mapObjectProps(subscription, new SubscriptionState()))
      .pipe( map( value => mapObjectProps(value, new Subscription())));
  }

}
