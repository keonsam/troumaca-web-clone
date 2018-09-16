import {Observable} from "rxjs";
import {Subscription} from "./lobby-home/subscription";
import {Billing} from "./lobby-home/billing";
import {ValidResp} from "../authentication/resp.valid";

export abstract class HomeRepository {

  public abstract getSubscription(type: string): Observable<Subscription>;
  public abstract getBilling(): Observable<Billing>;

  public abstract addBilling(billing: Billing, method: any): Observable<Billing>;
  public abstract addSubscription(subscription: Subscription): Observable<Subscription>;

  public abstract updateBilling(billing: Billing, method: any): Observable<number>;

  public abstract isValidCardName(value: string): Observable<ValidResp>;

  public abstract isValidCardNumber(value: string): Observable<ValidResp>;

  public abstract isValidCardExpDate(value: Date): Observable<ValidResp>;

  public abstract isValidCardCVV(value: string): Observable<ValidResp>;

  public abstract getSubscriptionInformation(): Observable<any>;
}
