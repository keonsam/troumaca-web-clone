import {Observable} from "rxjs";
import {Module} from "./module";
import {Subscription} from "./subscription";

export abstract class LobbyRepository {

  abstract getModules(): Observable<Module[]>;
  abstract addSubscription(subscription: Subscription): Observable<Subscription>;
}
