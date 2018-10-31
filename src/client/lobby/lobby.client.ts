import {Observable} from "rxjs";
import {App} from "../../lobby/app";
import {Subscription} from "../../lobby/subscription";


export abstract class LobbyClient {
  abstract getApps(): Observable<App[]>;
  abstract addSubscription(subscription: Subscription): Observable<Subscription>;
}
