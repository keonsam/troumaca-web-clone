import {Observable} from "rxjs";
import {PaymentMethod} from "./billing-modal/payment.method";
import {CreditCard} from "./billing-modal/credit.card";
import {ValidResp} from "../authentication/resp.valid";
import {Subscription} from "../home/lobby-home/subscription";
import {Billing} from "./billing";

export abstract class BillingDetailsRepository {
  abstract getPaymentMethods(): Observable<PaymentMethod[]>;
  abstract addCreditCard(creditCard: CreditCard): Observable<CreditCard>;
  abstract getSubscriptions(): Observable<Subscription[]>;
  abstract getBillings(): Observable<Billing[]>;
  abstract getCreditCards(): Observable<CreditCard[]>;
  abstract updateCreditCard(creditCard: CreditCard): Observable<number>;
  abstract deleteCreditCard(creditCardId: string): Observable<number>;

  // VALIDATION
  abstract isValidCardName(value: string): Observable<ValidResp>;
  abstract isValidCardNumber(value: string): Observable<ValidResp>;
  abstract isValidCardExpDate(value: Date): Observable<ValidResp>;
  abstract isValidCardCVV(value: string): Observable<ValidResp>;
}
