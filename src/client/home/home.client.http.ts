import {HomeClient} from "./home.client";
import {UUIDGenerator} from "../../uuid.generator";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {SubscriptionState} from "./subscription.state";
import {BillingState} from "./billing.state";
import {ValidResp} from "../../authentication/resp.valid";

export class HomeClientHttp extends HomeClient {
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
  }

  public getSubscriptionState(type: string): Observable<SubscriptionState> {
    const url = `${this.hostPort}/subscriptions/${type}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<SubscriptionState>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  public getBillingState(): Observable<BillingState> {
    const url = `${this.hostPort}/billings`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient.get<BillingState>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  public addBillingState(billingState: BillingState, methodState: any): Observable<BillingState> {
    const url = `${this.hostPort}/billings`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      billing: billingState.toJson(),
      method: methodState.toJson()
    };

    return this.httpClient.post<BillingState>(url, body, httpOptions)
      .map(data => {
        return data;
      });
  }

  public addSubscriptionState(subscriptionState: SubscriptionState): Observable<SubscriptionState> {
    const url = `${this.hostPort}/subscriptions`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<SubscriptionState>(url, subscriptionState.toJson(), httpOptions)
      .map(data => {
        return data;
      });
  }

  public updateBillingState(billingState: BillingState, methodState: any): Observable<number> {
    const url = `${this.hostPort}/billings/${billingState.billingId}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      billing: billingState.toJson(),
      method: methodState.toJson()
    };

    return this.httpClient.put<number>(url, body, httpOptions)
      .map(data => {
        return data;
      });
  }

  public getSubscriptionInformation(): Observable<any> {
    const url = `${this.hostPort}/subscription/information`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient.get<any>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  // CREDIT CARD

  public isValidCardName(value: string): Observable<ValidResp> {
    const url = `${this.hostPort}/validate-credit-card/name`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      cardName: value
    };

    return this.httpClient.post<ValidResp>(url, body, httpOptions)
      .map(data => {
        return data;
      });
  }

  public isValidCardNumber(value: string): Observable<ValidResp> {
    const url = `${this.hostPort}/validate-credit-card/number`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      cardNumber: value
    };

    return this.httpClient.post<ValidResp>(url, body, httpOptions)
      .map(data => {
        return data;
      });
  }

  public isValidCardExpDate(value: Date): Observable<ValidResp> {
    const url = `${this.hostPort}/validate-credit-card/exp-date`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      cardExpDate: value
    };

    return this.httpClient.post<ValidResp>(url, body, httpOptions)
      .map(data => {
        return data;
      });
  }

  public isValidCardCVV(value: string): Observable<ValidResp> {
    const url = `${this.hostPort}/validate-credit-card/cvv`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      cardCVV: value
    };

    return this.httpClient.post<ValidResp>(url, body, httpOptions)
      .map(data => {
        return data;
      });
  }

  public jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });

    return httpHeaders;
  }

}
