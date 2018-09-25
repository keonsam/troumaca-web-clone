import {BillingDetailsRepository} from "../../billing-details/billing.details.repository";
import {Observable} from "rxjs";
import {PaymentMethod} from "../../billing-details/billing-modal/payment.method";
import {BillingDetailsClient} from "../../client/billing-details/billing-details.client";
import {map} from "rxjs/operators";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {CreditCard} from "../../billing-details/billing-modal/credit.card";
import {CreditCardState} from "../../client/billing-details/credit.card.state";
import {ValidResp} from "../../authentication/resp.valid";
import {Subscription} from "../../home/lobby-home/subscription";
import {Billing} from "../../billing-details/billing";

export class BillingDetailsRepositoryAdapter extends BillingDetailsRepository {

  constructor(private billingDetailsClient: BillingDetailsClient) {
    super();
  }

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.billingDetailsClient.getPaymentMethods()
      .pipe( map( paymentMethods => {
        let newPaymentMethods: PaymentMethod[] = [];
        if (paymentMethods) {
          newPaymentMethods = paymentMethods.map( method => mapObjectProps(method, new PaymentMethod()));
        }
        return newPaymentMethods;
      }));
  }

  addCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    return this.billingDetailsClient.addCreditCard(mapObjectProps(creditCard, new CreditCardState()))
      .pipe( map( value => mapObjectProps(value, new CreditCard())));
  }

  getSubscriptions(): Observable<Subscription[]> {
    return this.billingDetailsClient.getSubscriptions()
      .pipe( map( value => {
        let newSubscription: Subscription[] = [];
        if (value) {
          newSubscription = value.map(x => mapObjectProps(x, new Subscription()));
        }
        return newSubscription;
      }));
  }

  getBillings(): Observable<Billing[]> {
    return this.billingDetailsClient.getBillings()
      .pipe( map( value => {
        let newBillings: Billing[] = [];
        if (value) {
          newBillings = value.map(x => mapObjectProps(x, new Billing()));
        }
        return newBillings;
      }));
  }

  getCreditCards(): Observable<CreditCard[]> {
    return this.billingDetailsClient.getCreditCards()
      .pipe( map( value => {
        let newCreditCards: CreditCard[] = [];
        if (value) {
          newCreditCards = value.map(x => mapObjectProps(x, new CreditCard()));
        }
        return newCreditCards;
      }));
  }

  updateCreditCard(creditCard: CreditCard): Observable<number> {
    return this.billingDetailsClient.updateCreditCard(mapObjectProps(creditCard, new CreditCardState()));
  }

  deleteCreditCard(creditCardId: string): Observable<number> {
    return this.billingDetailsClient.deleteCreditCard(creditCardId);
  }


  // Validation

  isValidCardName(value: string): Observable<ValidResp> {
    return this.billingDetailsClient.isValidCardName(value);
  }

  isValidCardNumber(value: string): Observable<ValidResp> {
    return this.billingDetailsClient.isValidCardNumber(value);
  }

  isValidCardExpDate(value: Date): Observable<ValidResp> {
    return this.billingDetailsClient.isValidCardExpDate(value);
  }

  isValidCardCVV(value: string): Observable<ValidResp> {
    return this.billingDetailsClient.isValidCardCVV(value);
  }

}
