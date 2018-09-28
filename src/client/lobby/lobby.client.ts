import {Observable} from "rxjs";
import {ModuleState} from "./module.state";
import {SubscriptionState} from "./subscription.state";


export abstract class LobbyClient {
  abstract getModules(): Observable<ModuleState[]>;
  abstract addSubscription(subscription: SubscriptionState): Observable<SubscriptionState>;

}
