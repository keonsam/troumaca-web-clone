import {Observable} from 'rxjs';
import {PaymentMethodState} from './payment.method.state';
import {CreditCardState} from './credit.card.state';
import { ValidResponse } from "../../authentication/valid.response";
import {SubscriptionState} from '../lobby/subscription.state';
import {BillingState} from './billing.state';

export abstract class BillingDetailsClient {
  abstract getPaymentMethods(): Observable<PaymentMethodState[]>;
  abstract addCreditCard(creditCardState: CreditCardState): Observable<CreditCardState>;
  abstract getSubscriptions(): Observable<SubscriptionState[]>;
  abstract getBillings(): Observable<BillingState[]>;
  abstract getCreditCards(): Observable<CreditCardState[]>;
  abstract updateCreditCard(creditCardState: CreditCardState): Observable<number>;
  abstract deleteCreditCard(creditCardId: string): Observable<number>;


  // VALIDATION
  abstract isValidCardName(value: string): Observable<ValidResponse>;
  abstract isValidCardNumber(value: string): Observable<ValidResponse>;
  abstract isValidCardExpDate(value: Date): Observable<ValidResponse>;
  abstract isValidCardCVV(value: string): Observable<ValidResponse>;
}
