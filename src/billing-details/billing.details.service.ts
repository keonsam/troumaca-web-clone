import {BehaviorSubject, Observable} from 'rxjs';
import {PaymentMethod} from './billing-modal/payment.method';
import {BillingDetailsRepository} from './billing.details.repository';
import {CreditCard} from './billing-modal/credit.card';
import { ValidResponse } from "../authentication/valid.response";
import {Subscription} from '../lobby/subscription';
import {Billing} from './billing';

export class BillingDetailsService {

  public paymentData = new BehaviorSubject<CreditCard[]>(
    []
  );

  public sendPrimary = new BehaviorSubject<CreditCard>(
    new CreditCard()
  );

  constructor(private billingDetailsRepository: BillingDetailsRepository) {}

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.billingDetailsRepository.getPaymentMethods();
  }

  addCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    return this.billingDetailsRepository.addCreditCard(creditCard);
  }

  getSubscriptions(): Observable<Subscription[]> {
    return this.billingDetailsRepository.getSubscriptions();
  }

  getBillings(): Observable<Billing[]> {
    return this.billingDetailsRepository.getBillings();
  }

  getCreditCards(): Observable<CreditCard[]> {
    return this.billingDetailsRepository.getCreditCards();
  }

  updateCreditCard(creditCard: CreditCard): Observable<number> {
    return this.billingDetailsRepository.updateCreditCard(creditCard);
  }

  deleteCreditCard(creditCardId: string): Observable<number> {
    return this.billingDetailsRepository.deleteCreditCard(creditCardId);
  }


  // VALIDATION

  public isValidCardName(value: string): Observable<ValidResponse> {
    return this.billingDetailsRepository.isValidCardName(value);
  }

  public isValidCardNumber(value: string): Observable<ValidResponse> {
    return this.billingDetailsRepository.isValidCardNumber(value);
  }

  public isValidCardExpDate(value: Date): Observable<ValidResponse> {
    return this.billingDetailsRepository.isValidCardExpDate(value);
  }

  public isValidCardCVV(value: string): Observable<ValidResponse> {
    return this.billingDetailsRepository.isValidCardCVV(value);
  }

}
