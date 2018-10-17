import {Observable} from "rxjs";
import {SubscriptionState} from "./subscription.state";
import {Module} from "../../lobby/module";


export abstract class LobbyClient {
  abstract getModules(): Observable<Module[]>;
  abstract addSubscription(subscription: SubscriptionState): Observable<SubscriptionState>;

}
