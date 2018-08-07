import {HomeRepository} from "./home.repository";
import {Observable} from "rxjs/Observable";
import {Subscription} from "./lobby-home/subscription";
import { Billing } from "./lobby-home/billing";

export class HomeService  {

  constructor(private homeRepository: HomeRepository) {
  }

  public getSubscription(type: string): Observable<Subscription> {
    return this.homeRepository.getSubscription(type);
  }

  public getBilling(): Observable<Billing> {
    return this.homeRepository.getBilling();
  }

  public addBilling(billing: Billing , method: any): Observable<Billing> {
    return this.homeRepository.addBilling(billing, method);
  }

  public addSubscription(subscription: Subscription): Observable<Subscription> {
    return this.homeRepository.addSubscription(subscription);
  }

  public updateBilling(billing: Billing , method: any): Observable<number> {
    return this.homeRepository.updateBilling(billing, method);
  }

}
