import {BillingDetailsClient} from "./billing-details.client";
import {UUIDGenerator} from "../../uuid.generator";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaymentMethodState} from "./payment.method.state";
import {map} from "rxjs/operators";
import {CreditCardState} from "./credit.card.state";
import {ValidResp} from "../../authentication/resp.valid";
import {SubscriptionState} from "../lobby/subscription.state";
import {BillingState} from "./billing.state";

export class BillingDetailsClientHttp extends BillingDetailsClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
  }

  getPaymentMethods(): Observable<PaymentMethodState[]> {
    const url = `${this.hostPort}/billings/payment-methods`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<PaymentMethodState[]>(url, httpOptions)
      .pipe( map( paymentMethods => paymentMethods));
  }

  addCreditCard(creditCardState: CreditCardState): Observable<CreditCardState> {
    const url = `${this.hostPort}/billings/credit-cards`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<CreditCardState>(url, creditCardState.toJson(), httpOptions)
      .pipe( map( value => value));
  }

  getSubscriptions(): Observable<SubscriptionState[]> {
    const url = `${this.hostPort}/subscriptions`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<SubscriptionState[]>(url, httpOptions)
      .pipe( map(value => value));
  }

  getBillings(): Observable<BillingState[]> {
    const url = `${this.hostPort}/billings`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<BillingState[]>(url, httpOptions)
      .pipe( map(value => value));
  }

  getCreditCards(): Observable<CreditCardState[]> {
    const url = `${this.hostPort}/billings/credit-cards`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<CreditCardState[]>(url, httpOptions)
      .pipe( map(value => value));
  }

  updateCreditCard(creditCardState: CreditCardState): Observable<number> {
    const url = `${this.hostPort}/billings/credit-cards/${creditCardState.creditCardId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, creditCardState.toJson(), httpOptions)
      .pipe( map(value => value));
  }

  deleteCreditCard(creditCardId: string): Observable<number> {
    const url = `${this.hostPort}/billings/credit-cards/${creditCardId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.delete<number>(url, httpOptions)
      .pipe( map(value => value));
  }

  // VALIDATION

  isValidCardName(value: string): Observable<ValidResp> {
    const url = `${this.hostPort}/billings/validate/card-name`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      cardName: value
    };

    return this.httpClient.post<ValidResp>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public isValidCardNumber(value: string): Observable<ValidResp> {
    const url = `${this.hostPort}/billings/validate/card-number`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      cardNumber: value
    };

    return this.httpClient.post<ValidResp>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public isValidCardExpDate(value: Date): Observable<ValidResp> {
    const url = `${this.hostPort}/billings/validate/card-exp-date`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      cardExpDate: value
    };

    return this.httpClient.post<ValidResp>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public isValidCardCVV(value: string): Observable<ValidResp> {
    const url = `${this.hostPort}/billings/validate/card-cvv`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      cardCVV: value
    };

    return this.httpClient.post<ValidResp>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  private jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }
}
