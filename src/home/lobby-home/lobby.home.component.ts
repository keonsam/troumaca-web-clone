import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {HomeService} from '../home.service';
import { Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreditCard} from './credit.card';
import {Billing} from './billing';
import { Subscription} from './subscription';

@Component({
  selector: 'lobby-home',
  templateUrl: './lobby.home.component.html',
  styleUrls: ['./lobby.home.component.css']
})

export class LobbyHomeComponent implements OnInit {

  @ViewChild('showModal') showModal: ElementRef;
  @ViewChild('showModal2') showModal2: ElementRef;


  private _paymentMethod: string;
  private _cardName: FormControl;
  private _cardNumber: FormControl;
  private _cardExpDate: FormControl;
  private _cardCVV: FormControl;

  private _creditCardForm: FormGroup;

  private creditCard: CreditCard;
  private billing: Billing;
  private subscription: Subscription;

  private _billed: boolean;
  private _typeName: string;

  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage1: boolean;
  private _currentModel: string;
  private _justBilled: boolean;
  private _information: any;

  // private _paymentMethods: PaymentMethod[];

  constructor(private homeService: HomeService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.paymentMethod = 'Credit Card';

    this.creditCard = new CreditCard();
    this.billing = new Billing();
    this.subscription = new Subscription();

    this.cardName = new FormControl('', [Validators.required]);
    this.cardNumber = new FormControl('', [Validators.required]);
    this.cardExpDate = new FormControl('', [Validators.required]);
    this.cardCVV = new FormControl('', [Validators.required]);

    this.creditCardForm = formBuilder.group({
      'cardName': this.cardName,
      'cardNumber': this.cardNumber,
      'cardExpDate': this.cardExpDate,
      'cardCVV': this.cardCVV
    });

    this.creditCardForm
      .valueChanges
      .subscribe( value => {
        this.creditCard.cardName = value.cardName;
        this.creditCard.cardNumber = value.cardNumber;
        this.creditCard.cardExpDate = value.cardExpDate;
        this.creditCard.cardCVV = value.cardCVV;
      }, error => {
        console.log(error);
      });

    this.billed = false;
    this.justBilled = false;

    this.information = {
      'Asset Management': {
        'description': '',
        'features': [],
        'route': ['/assets'],
        'cost': '199.99',
        'subscribed': false
      },
      'User Management': {
        'description': '',
        'features': [],
        'route': ['/parties/users'],
        'cost': 'Free',
        'subscribed': false
      },
      'Organization Management': {
        'description': '',
        'features': [],
        'route': ['/parties'],
        'cost': 'Free',
        'subscribed': false
      },
      'Depreciation Management': {
        'description': '',
        'features': [],
        'route': ['/depreciation'],
        'cost': '99.99',
        'subscribed': false
      }
    };

    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage1 = true;
  }

  ngOnInit(): void {
    this.homeService.getSubscriptionInformation()
      .subscribe( information => {
        if (information) {
          this.information = information;
        }
      });
  }

  get paymentMethod(): string {
    return this._paymentMethod;
  }

  set paymentMethod(value: string) {
    this._paymentMethod = value;
  }

  get cardName(): FormControl {
    return this._cardName;
  }

  set cardName(value: FormControl) {
    this._cardName = value;
  }

  get cardNumber(): FormControl {
    return this._cardNumber;
  }

  set cardNumber(value: FormControl) {
    this._cardNumber = value;
  }

  get cardExpDate(): FormControl {
    return this._cardExpDate;
  }

  set cardExpDate(value: FormControl) {
    this._cardExpDate = value;
  }

  get cardCVV(): FormControl {
    return this._cardCVV;
  }

  set cardCVV(value: FormControl) {
    this._cardCVV = value;
  }

  get creditCardForm(): FormGroup {
    return this._creditCardForm;
  }

  set creditCardForm(value: FormGroup) {
    this._creditCardForm = value;
  }

  get billed(): boolean {
    return this._billed;
  }

  set billed(value: boolean) {
    this._billed = value;
  }

  get typeName(): string {
    return this._typeName;
  }

  set typeName(value: string) {
    this._typeName = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  get doNotDisplayFailureMessage1(): boolean {
    return this._doNotDisplayFailureMessage1;
  }

  set doNotDisplayFailureMessage1(value: boolean) {
    this._doNotDisplayFailureMessage1 = value;
  }

  get currentModel(): string {
    return this._currentModel;
  }

  set currentModel(value: string) {
    this._currentModel = value;
  }

  get justBilled(): boolean {
    return this._justBilled;
  }

  set justBilled(value: boolean) {
    this._justBilled = value;
  }

  get information(): any {
    return this._information;
  }

  set information(value: any) {
    this._information = value;
  }

  showNextModel(type: string) {
    this.currentModel = type;
  }

  module(type: string) {
    if (this.information[type].cost === 'Free') {
      this.router.navigate(this.information[type].route);
    }else {
      this.homeService.getSubscription(type)
        .subscribe(subscription => {
          if (subscription.subscribed) {
            this.router.navigate(this.information[type].route);
          } else {
            this.currentModel = 'features';
            this.typeName = type;
            this.homeService.getBilling()
              .subscribe(billing => {
                if (billing.confirmed) {
                  this.billed = true;
                } else {
                  this.billed = false;
                }
                this.showModal.nativeElement.click();
              });
          }
        });
    }
  }

  onCreditCardSubmit() {
    this.doNotDisplayFailureMessage = true;

    this.billing.type = this.paymentMethod;
    this.homeService.addBilling(this.billing, this.creditCard)
      .subscribe( billing => {
        if (billing.billingId) {
          this.billing = billing;
          this.justBilled = true;
          this.showNextModel('subscribe');
        }else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
        console.log(error);
      });
  }

  onEditCreditCard() {
    this.doNotDisplayFailureMessage = true;
    this.billing.type = this.paymentMethod;
    this.homeService.updateBilling(this.billing, this.creditCard)
      .subscribe( numReplaced => {
        if (numReplaced) {
          this.justBilled = true;
          this.showNextModel('subscribe');
        }else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
        console.log(error);
      });
  }

  onSubscribe() {
    this.doNotDisplayFailureMessage1 = true;

    // this.subscription.type = this.typeName;

    this.homeService.addSubscription(this.subscription)
      .subscribe( subscription => {
        if (subscription.subscriptionId) {
          this.showModal2.nativeElement.click();
        } else {
          this.doNotDisplayFailureMessage1 = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage1 = false;
        console.log(error);
      });
  }

}

