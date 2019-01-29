import {BillingDetailsClient} from './billing-details.client';
import {UUIDGenerator} from '../../uuid.generator';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ValidResponse } from '../../authentication/valid.response';
import {Subscription} from '../../lobby/subscription';
import {Billing} from '../../billing-details/billing';
import {PaymentMethod} from '../../billing-details/billing-modal/payment.method';
import {PaymentInformation} from '../../billing-details/billing-modal/payment.information';
import {environment} from '../../environments/environment';

export class BillingDetailsClientHttp extends BillingDetailsClient {

  hostPort = environment.hostPort;
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient) {
    super();
  }

  getSubscriptions(): Observable<Subscription[]> {
    const url = `${this.hostPort}/subscriptions`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Subscription[]>(url, httpOptions)
      .pipe( map(value => value));
  }

  getBillings(): Observable<Billing[]> {
    const url = `${this.hostPort}/billings`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Billing[]>(url, httpOptions)
      .pipe( map(value => value));
  }

  getPaymentMethods(): Observable<PaymentMethod[]> {
    const url = `${this.hostPort}/billings/payment-methods`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<PaymentMethod[]>(url, httpOptions)
      .pipe( map( paymentMethods => paymentMethods));
  }

  addPaymentInformation(paymentInformation: PaymentInformation): Observable<PaymentInformation> {
    const url = `${this.hostPort}/billings/payment-information`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<PaymentInformation>(url, paymentInformation, httpOptions)
      .pipe( map( value => value));
  }

  getPaymentInformation(): Observable<PaymentInformation[]> {
    const url = `${this.hostPort}/billings/payment-information`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<PaymentInformation[]>(url, httpOptions)
      .pipe( map(value => value));
  }

  updatePaymentInformation(paymentInfo: PaymentInformation): Observable<number> {
    const url = `${this.hostPort}/billings/payment-information/${paymentInfo.paymentId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, paymentInfo, httpOptions)
      .pipe( map(value => value));
  }

  deletePaymentInformation(paymentId: string): Observable<number> {
    const url = `${this.hostPort}/billings/payment-information/${paymentId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.delete<number>(url, httpOptions)
      .pipe( map(value => value));
  }

  deleteSubscription(subscriptionId: string): Observable<number> {
    const url = `${this.hostPort}/subscriptions/${subscriptionId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.delete<number>(url, httpOptions)
      .pipe( map(value => value));
  }

  // VALIDATION

  isValidCardName(value: string): Observable<ValidResponse> {
    const url = `${this.hostPort}/billings/validate/card-name`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      cardName: value
    };

    return this.httpClient.post<ValidResponse>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public isValidCardNumber(value: string): Observable<ValidResponse> {
    const url = `${this.hostPort}/billings/validate/card-number`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      cardNumber: value
    };

    return this.httpClient.post<ValidResponse>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public isValidCardExpDate(value: Date): Observable<ValidResponse> {
    const url = `${this.hostPort}/billings/validate/card-exp-date`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      cardExpDate: value
    };

    return this.httpClient.post<ValidResponse>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public isValidCardCVV(value: string): Observable<ValidResponse> {
    const url = `${this.hostPort}/billings/validate/card-cvv`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      cardCVV: value
    };

    return this.httpClient.post<ValidResponse>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  isValidPaymentMethod(): Observable<ValidResponse> {
    const url = `${this.hostPort}/billings/payment-methods/is-valid`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient.get<ValidResponse>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  private jsonHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
  }
}
