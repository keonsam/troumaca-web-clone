import {Observable} from "rxjs/Observable";
import {Subscription} from "./lobby-home/subscription";
import {Billing} from "./lobby-home/billing";

export abstract class HomeRepository {

  public abstract getSubscription(type: string): Observable<Subscription>;
  public abstract getBilling(): Observable<Billing>;

  public abstract addBilling(billing: Billing, method: any): Observable<Billing>;
  public abstract addSubscription(subscription: Subscription): Observable<Subscription>;

}
