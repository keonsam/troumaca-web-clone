import {Observable} from "rxjs";
import {App} from "./app";
import {Subscription} from "./subscription";

export abstract class LobbyRepository {

  abstract getApps(): Observable<App[]>;
  abstract addSubscription(subscription: Subscription): Observable<Subscription>;
}
