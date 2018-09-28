import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Subscription} from "../lobby/subscription";
import {Billing} from "./billing";
import {BillingDetailsService} from "./billing.details.service";
import {CreditCard} from "./billing-modal/credit.card";

@Component({
  selector: 'app-billing-details',
  templateUrl: 'billing-details.component.html',
  styleUrls: ['billing-details.component.css']
})
export class BillingDetailsComponent implements OnInit {

  subscriptions: Subscription[];
  billings: Billing[];
  totalBilling: number;
  creditCards: CreditCard[];
  cardName: string;
  cardId: string;
  billingModalType: string;
  creditCard: CreditCard;
  @ViewChild('openButton') openButton: ElementRef;
  @ViewChild('closeButton') closeButton: ElementRef;
  doNotDisplayFailureMessage = true;


  constructor(private billingDetailsService: BillingDetailsService) {
    this.subscriptions = [];
    this.billings = [];
    this.creditCards = [];

    this.billingDetailsService.sendPrimary.subscribe(data => {
      if (data.creditCardId) {
        this.creditCard = data;
        this.openButton.nativeElement.click();
      }
    });
    this.creditCard = new CreditCard();
  }

  ngOnInit(): void {
    this.billingDetailsService.getSubscriptions()
      .subscribe(subscriptions => {
        if (subscriptions.length > 0) {
          this.subscriptions = [];
        }
      });

    // This is made to the billed db to get all past billed payments
    this.billingDetailsService.getBillings()
      .subscribe(billings => {
        if (billings.length > 0) {
          this.billings = billings;
        }
      });

    this.getCreditCards();
  }

  private getCreditCards() {
    this.billingDetailsService.getCreditCards()
      .subscribe(creditCards => {
        if (creditCards.length > 0) {
          this.creditCards = creditCards;
          this.billingDetailsService.paymentData.next(creditCards);
        }
      });
  }

  onOpenModal(cardId: string, cardName: string) {
    this.cardId = cardId;
    this.cardName = cardName;
  }

  onBillingModalOpen(type: string, creditCard?: CreditCard) {
    this.billingModalType = type;
    if (creditCard) {
      this.creditCard = creditCard;
    }
  }

  onBillingChanges(changed: boolean) {
    if (changed) {
      this.getCreditCards();
    }
  }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.billingDetailsService
        .deleteCreditCard(this.cardId)
        .subscribe(num => {
          if (num) {
            this.getCreditCards();
          }
        });
    }
  }

  onMakePrimary() {
    this.doNotDisplayFailureMessage = true;
    this.creditCard.status = 'primary';
    this.billingDetailsService.updateCreditCard(this.creditCard)
      .subscribe(num => {
        if (num) {
          this.getCreditCards();
          this.closeButton.nativeElement.click();
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      });
  }
}
