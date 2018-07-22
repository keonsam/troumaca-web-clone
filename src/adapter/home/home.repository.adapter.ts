import {HomeRepository} from "../../home/home.repository";
import {HomeClient} from "../../client/home/home.client";
import {Observable} from "rxjs/Observable";
import {Subscription} from "../../home/lobby-home/subscription";
import {Billing} from "../../home/lobby-home/billing";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {BillingState} from "../../client/home/billing.state";
import {CreditCardState} from "../../client/home/credit.card.state";
import {SubscriptionState} from "../../client/home/subscription.state";

export class HomeRepositoryAdapter extends HomeRepository {
  constructor(private homeClient: HomeClient) {
    super();
  }

  public getSubscription(type: string): Observable<Subscription> {
    return this.homeClient.getSubscriptionState(type)
      .map(subscription => {
         return mapObjectProps(subscription, new Subscription());
      });
  }

  public getBilling(): Observable<Billing> {
    return this.homeClient.getBillingState()
      .map(billing => {
        return mapObjectProps(billing, new Billing());
      });
  }

  public addBilling(billing: Billing, method: any): Observable<Billing> {
    const methodState = billing.type === 'Credit Card' ? mapObjectProps(method, new CreditCardState()) : '';
    return this.homeClient.addBillingState(mapObjectProps(billing, new BillingState()), methodState)
      .map(billingState => {
        return mapObjectProps(billingState, new Billing());
      });
  }

  public addSubscription(subscription: Subscription): Observable<Subscription> {
    return this.homeClient.addSubscriptionState(mapObjectProps(subscription, new SubscriptionState()))
      .map(subscriptionState => {
        return mapObjectProps(subscriptionState, new Subscription());
      });
  }

}
