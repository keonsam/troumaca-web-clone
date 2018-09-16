import {Observable} from "rxjs";
import {SubscriptionState} from "./subscription.state";
import {BillingState} from "./billing.state";
import {ValidResp} from "../../authentication/resp.valid";


export abstract class HomeClient {

  public abstract getSubscriptionState(type: string): Observable<SubscriptionState>;
  public abstract getBillingState(): Observable<BillingState>;

  public abstract addBillingState(billingState: BillingState, methodState: any): Observable<BillingState>;
  public abstract addSubscriptionState(subscriptionState: SubscriptionState): Observable<SubscriptionState>;

  public abstract updateBillingState(billingState: BillingState, methodState: any): Observable<number>;

  public abstract isValidCardName(value: string): Observable<ValidResp>;

  public abstract isValidCardNumber(value: string): Observable<ValidResp>;

  public abstract isValidCardExpDate(value: Date): Observable<ValidResp>;

  public abstract isValidCardCVV(value: string): Observable<ValidResp>;

  public abstract getSubscriptionInformation(): Observable<any>;
}
