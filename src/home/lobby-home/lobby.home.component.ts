import {Component, Input, OnInit,ViewChild, ElementRef} from '@angular/core';
import {HomeService} from "../home.service";
import { Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreditCard} from "./credit.card";
import {Billing} from "./billing";
import { Subscription} from "./subscription";

@Component({
  selector: 'lobby-home',
  templateUrl: './lobby.home.component.html',
  styleUrls: ['./lobby.home.component.css']
})
export class LobbyHomeComponent implements OnInit {

  @ViewChild('showModal') showModal: ElementRef;
  @ViewChild('showModal1') showModal1: ElementRef;
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

  private _moduleRoutes: any;
  private _freeModules: string[];
  private _billed: boolean;
  private _typeName: string;
  private _typeDescription: any;
  private _features: any;
  private _price: any;

  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage1: boolean;



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

    this.moduleRoutes = {
      'Asset Management': ['/assets'],
      'Organization Management': ['/parties'],
      'User Management': ['/parties/users']
    };

    this.freeModules = ['Organization Management', 'User Management'];

    this.billed = false;

    const assetDes = 'Manage assets in the cloud to create effective databases breakdowns';
    const userDes = 'Allows users to access and management your assets';
    const organDes = 'Create organizations to manage their assets and users in the cloud';

    this.typeDescription = {
      'Asset Management': assetDes,
      'Organization Management': userDes,
      'User Management': organDes
    };

    this.typeName = 'Asset Management';
    const assetFeatures = ['Assets', 'Asset Types', 'Asset Classes', 'Attributes', 'Site Management', 'Data Types'];
    const userFeatures = ['Users', 'Authorization', 'Profile Page'];
    const organFeatures = ['Organization', 'Organization Profile Page'];

    this.features = {
      'Asset Management': assetFeatures,
      'Organization Management': userFeatures,
      'User Management': organFeatures
    };

    this.price = {
      'Asset Management': '$19.99',
    };

    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage1 = true;
  }

  ngOnInit(): void {
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

  get moduleRoutes(): any {
    return this._moduleRoutes;
  }

  set moduleRoutes(value: any) {
    this._moduleRoutes = value;
  }

  get freeModules(): string[] {
    return this._freeModules;
  }

  set freeModules(value: string[]) {
    this._freeModules = value;
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

  get typeDescription(): any {
    return this._typeDescription;
  }

  set typeDescription(value: any) {
    this._typeDescription = value;
  }

  get features(): any {
    return this._features;
  }

  set features(value: any) {
    this._features = value;
  }

  get price(): any {
    return this._price;
  }

  set price(value: any) {
    this._price = value;
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

  isModuleFree() {
    return this.freeModules.indexOf(this.typeName) !== -1;
  }

  module(type: string) {
    this.homeService.getSubscription(type)
      .subscribe( subscription => {
        if (subscription.subscribed) {
          this.router.navigate(this.moduleRoutes[type]);
        }else {
          this.typeName = type;
          if (!this.isModuleFree()) {
            this.homeService.getBilling()
              .subscribe(billing => {
                if (billing.confirmed) {
                  this.billed = true;
                }else {
                 this.billed = false;
                }
                this.showModal.nativeElement.click();
              });
          }else {
            this.billed = true;
            this.showModal.nativeElement.click();
          }
        }
      });
  }

  onCreditCardSubmit() {
    this.doNotDisplayFailureMessage = true;

    this.billing.type = this.paymentMethod;
    this.homeService.addBilling(this.billing, this.creditCard)
      .subscribe( billing => {
        if (billing.billingId) {
          this.showModal1.nativeElement.click();
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

    this.subscription.type = this.typeName;

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

