import {Observable} from "rxjs";
import {PaymentMethodState} from "./payment.method.state";
import {CreditCardState} from "./credit.card.state";
import {ValidResp} from "../../authentication/resp.valid";
import {SubscriptionState} from "../lobby/subscription.state";
import {BillingState} from "./billing.state";

export abstract class BillingDetailsClient {
  abstract getPaymentMethods(): Observable<PaymentMethodState[]>;
  abstract addCreditCard(creditCardState: CreditCardState): Observable<CreditCardState>;
  abstract getSubscriptions(): Observable<SubscriptionState[]>;
  abstract getBillings(): Observable<BillingState[]>;
  abstract getCreditCards(): Observable<CreditCardState[]>;
  abstract updateCreditCard(creditCardState: CreditCardState): Observable<number>;
  abstract deleteCreditCard(creditCardId: string): Observable<number>;


  // VALIDATION
  abstract isValidCardName(value: string): Observable<ValidResp>;
  abstract isValidCardNumber(value: string): Observable<ValidResp>;
  abstract isValidCardExpDate(value: Date): Observable<ValidResp>;
  abstract isValidCardCVV(value: string): Observable<ValidResp>;
}
