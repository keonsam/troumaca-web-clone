import {BillingDetailsRepository} from '../../billing-details/billing.details.repository';
import {Observable} from 'rxjs';
import {PaymentMethod} from '../../billing-details/billing-modal/payment.method';
import {BillingDetailsClient} from '../../client/billing-details/billing-details.client';
import { ValidResponse } from '../../authentication/valid.response';
import {Subscription} from '../../lobby/subscription';
import {Billing} from '../../billing-details/billing';
import {PaymentInformation} from '../../billing-details/billing-modal/payment.information';

export class BillingDetailsRepositoryAdapter extends BillingDetailsRepository {

  constructor(private billingDetailsClient: BillingDetailsClient) {
    super();
  }

  getSubscriptions(): Observable<Subscription[]> {
    return this.billingDetailsClient.getSubscriptions();
  }

  getBillings(): Observable<Billing[]> {
    return this.billingDetailsClient.getBillings();
  }

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.billingDetailsClient.getPaymentMethods();
  }

  addPaymentInformation(paymentInformation: PaymentInformation): Observable<PaymentInformation> {
    return this.billingDetailsClient.addPaymentInformation(paymentInformation);
  }

  getPaymentInformation(): Observable<PaymentInformation[]> {
    return this.billingDetailsClient.getPaymentInformation();
  }

  updatePaymentInformation(paymentInfo: PaymentInformation): Observable<number> {
    return this.billingDetailsClient.updatePaymentInformation(paymentInfo);
  }

  deletePaymentInformation(paymentId: string): Observable<number> {
    return this.billingDetailsClient.deletePaymentInformation(paymentId);
  }


  // Validation

  isValidCardName(value: string): Observable<ValidResponse> {
    return this.billingDetailsClient.isValidCardName(value);
  }

  isValidCardNumber(value: string): Observable<ValidResponse> {
    return this.billingDetailsClient.isValidCardNumber(value);
  }

  isValidCardExpDate(value: Date): Observable<ValidResponse> {
    return this.billingDetailsClient.isValidCardExpDate(value);
  }

  isValidCardCVV(value: string): Observable<ValidResponse> {
    return this.billingDetailsClient.isValidCardCVV(value);
  }

  isValidPaymentMethod(): Observable<ValidResponse> {
    return this.billingDetailsClient.isValidPaymentMethod();
  }

}
