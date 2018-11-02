import {BehaviorSubject, Observable} from 'rxjs';
import {PaymentMethod} from './billing-modal/payment.method';
import {BillingDetailsRepository} from './billing.details.repository';
import { ValidResponse } from "../authentication/valid.response";
import {Subscription} from '../lobby/subscription';
import {Billing} from './billing';
import {PaymentInformation} from "./billing-modal/payment.information";

export class BillingDetailsService {

  public onOpenModal = new BehaviorSubject<PaymentInformation>(new PaymentInformation());
  public paymentInfoEdit = new BehaviorSubject<boolean>(false);

  constructor(private billingDetailsRepository: BillingDetailsRepository) {}

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.billingDetailsRepository.getPaymentMethods();
  }

  addPaymentInformation(paymentInformation: PaymentInformation): Observable<PaymentInformation> {
    return this.billingDetailsRepository.addPaymentInformation(paymentInformation);
  }

  getSubscriptions(): Observable<Subscription[]> {
    return this.billingDetailsRepository.getSubscriptions();
  }

  getBillings(): Observable<Billing[]> {
    return this.billingDetailsRepository.getBillings();
  }

  getPaymentInformation(): Observable<PaymentInformation[]> {
    return this.billingDetailsRepository.getPaymentInformation();
  }

  updatePaymentInformation(paymentInformation: PaymentInformation): Observable<number> {
    return this.billingDetailsRepository.updatePaymentInformation(paymentInformation);
  }

  deletePaymentInformation(paymentId: string): Observable<number> {
    return this.billingDetailsRepository.deletePaymentInformation(paymentId);
  }

  deleteSubscription(subscriptionId: string): Observable<number> {
    return this.billingDetailsRepository.deleteSubscription(subscriptionId);
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

  isValidPaymentMethod(): Observable<ValidResponse> {
    return this.billingDetailsRepository.isValidPaymentMethod();
  }

}
