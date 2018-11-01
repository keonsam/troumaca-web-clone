import {Observable} from 'rxjs';
import { ValidResponse } from "../../authentication/valid.response";
import {Subscription} from "../../lobby/subscription";
import {Billing} from "../../billing-details/billing";
import {PaymentMethod} from "../../billing-details/billing-modal/payment.method";
import {PaymentInformation} from "../../billing-details/billing-modal/payment.information";

export abstract class BillingDetailsClient {
  abstract getSubscriptions(): Observable<Subscription[]>;

  abstract getBillings(): Observable<Billing[]>;

  abstract getPaymentMethods(): Observable<PaymentMethod[]>;

  abstract addPaymentInformation(paymentInformation: PaymentInformation): Observable<PaymentInformation>;

  abstract getPaymentInformation(): Observable<PaymentInformation[]>;

  abstract updatePaymentInformation(paymentInformation: PaymentInformation): Observable<number>;

  abstract deletePaymentInformation(paymentId: string): Observable<number>;

  abstract deleteSubscription(subscriptionId: string): Observable<number>;


  // VALIDATION
  abstract isValidCardName(value: string): Observable<ValidResponse>;

  abstract isValidCardNumber(value: string): Observable<ValidResponse>;

  abstract isValidCardExpDate(value: Date): Observable<ValidResponse>;

  abstract isValidCardCVV(value: string): Observable<ValidResponse>;

  abstract isValidPaymentMethod(): Observable<ValidResponse>;
}

