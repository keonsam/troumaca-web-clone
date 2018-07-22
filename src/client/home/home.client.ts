import {Observable} from "rxjs/Observable";
import {SubscriptionState} from "./subscription.state";
import {BillingState} from "./billing.state";


export abstract class HomeClient {

  public abstract getSubscriptionState(type: string): Observable<SubscriptionState>;
  public abstract getBillingState(): Observable<BillingState>;

  public abstract addBillingState(billingState: BillingState, methodState: any): Observable<BillingState>;
  public abstract addSubscriptionState(subscriptionState: SubscriptionState): Observable<SubscriptionState>;

}
