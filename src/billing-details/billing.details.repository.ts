import {Observable} from 'rxjs';
import {PaymentMethod} from './billing-modal/payment.method';
import {CreditCard} from './billing-modal/credit.card';
import { ValidResponse } from "../authentication/valid.response";
import {Subscription} from '../lobby/subscription';
import {Billing} from './billing';

export abstract class BillingDetailsRepository {
  abstract getPaymentMethods(): Observable<PaymentMethod[]>;
  abstract addCreditCard(creditCard: CreditCard): Observable<CreditCard>;
  abstract getSubscriptions(): Observable<Subscription[]>;
  abstract getBillings(): Observable<Billing[]>;
  abstract getCreditCards(): Observable<CreditCard[]>;
  abstract updateCreditCard(creditCard: CreditCard): Observable<number>;
  abstract deleteCreditCard(creditCardId: string): Observable<number>;

  // VALIDATION
  abstract isValidCardName(value: string): Observable<ValidResponse>;
  abstract isValidCardNumber(value: string): Observable<ValidResponse>;
  abstract isValidCardExpDate(value: Date): Observable<ValidResponse>;
  abstract isValidCardCVV(value: string): Observable<ValidResponse>;
}
