import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subscription} from '../lobby/subscription';
import {Billing} from './billing';
import {BillingDetailsService} from './billing.details.service';
import {PaymentInformation} from './billing-modal/payment.information';

@Component({
  selector: 'app-billing-details',
  templateUrl: 'billing-details.component.html',
  styleUrls: ['billing-details.component.css']
})
export class BillingDetailsComponent implements OnInit {

  subscriptions: Subscription[];
  billings: Billing[];
  paymentInformation: PaymentInformation[];
  cardName: string;
  paymentId: string;
  paymentInfo: PaymentInformation;
  @ViewChild('openButton') openButton: ElementRef;
  @ViewChild('closeButton') closeButton: ElementRef;
  doNotDisplayFailureMessage = true;


  constructor(private billingDetailsService: BillingDetailsService) {
    this.subscriptions = [];
    this.billings = [];
    this.paymentInformation = [];

    this.paymentInfo = new PaymentInformation();

    this.billingDetailsService.paymentInfoEdit
      .subscribe(value => {
        if (value) {
          this.getPaymentInformation();
        }
      });
  }

  ngOnInit(): void {
    // This is made to the billed db to get all past billed payments
    this.billingDetailsService.getBillings()
      .subscribe(billings => {
        if (billings && billings.length > 0) {
          this.billings = billings;
        }
      });

    this.getSubscriptions();
    this.getPaymentInformation();
  }

  private getSubscriptions() {
    this.billingDetailsService.getSubscriptions()
      .subscribe(subscriptions => {
        if (subscriptions && subscriptions.length > 0) {
          this.subscriptions = subscriptions;
        }else {
          this.subscriptions = [];
        }
      });
  }

  private getPaymentInformation() {
    this.billingDetailsService.getPaymentInformation()
      .subscribe(paymentInfo => {
        if (paymentInfo && paymentInfo.length > 0) {
          this.paymentInformation = paymentInfo;
        }
      });
  }

  onOpenModal(paymentId: string, cardName: string) {
    this.paymentId = paymentId;
    this.cardName = cardName;
  }

  onBillingModalOpen(paymentInfo?: PaymentInformation) {
    this.billingDetailsService.onOpenModal.next(paymentInfo);
  }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.billingDetailsService
        .deletePaymentInformation(this.paymentId)
        .subscribe(num => {
          if (num) {
            this.getPaymentInformation();
          }
        });
    }
  }

  onUnSubscribe(subscriptionId: string) {
    this.billingDetailsService.deleteSubscription(subscriptionId)
      .subscribe( num => {
        if (num) {
          this.getSubscriptions();
        }
      });
  }

  // onMakePrimary() {
  //   this.doNotDisplayFailureMessage = true;
  //   this.paymentInfo.status = 'primary';
  //   this.billingDetailsService.updatePaymentInformation(this.paymentInfo)
  //     .subscribe(num => {
  //       if (num) {
  //         this.getPaymentInformation();
  //         this.closeButton.nativeElement.click();
  //       } else {
  //         this.doNotDisplayFailureMessage = false;
  //       }
  //     });
  // }
}
