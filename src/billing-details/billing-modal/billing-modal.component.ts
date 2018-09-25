import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, ViewChild, Output} from "@angular/core";
import {PaymentMethod} from "./payment.method";
import {BillingDetailsService} from "../billing.details.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreditCard} from "./credit.card";
import { debounceTime, filter, map, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'app-billing-modal',
  templateUrl: 'billing-modal.component.html',
  styleUrls: ['billing-modal.component.css']
})

export class BillingModalComponent implements OnInit, OnChanges {
  paymentMethods: PaymentMethod[];
  doNotDisplayFailureMessage = true;
  billingForm: FormGroup;
  creditCardForm: FormGroup;

  paymentMethodId: FormControl;
  cardName: FormControl;
  cardNumber: FormControl;
  cardExpDate: FormControl;
  cardCVV: FormControl;
  private creditCard: CreditCard;
  @ViewChild('closeModal') closeModal: ElementRef;
  @Input() modalType: string;
  @Input() importedCreditCard: CreditCard;
  creditCardExist = false;
  @Output() billingChanged = new EventEmitter<boolean>();

  constructor(private billingDetailsService: BillingDetailsService,
              private formBuilder: FormBuilder) {

    this.paymentMethodId = new FormControl('9f9e5106-1235-4f61-9609-b8fea945e066', [Validators.required]);
    this.cardName = new FormControl('', [Validators.required, this.cardNameValidator(this.billingDetailsService)]);
    this.cardNumber = new FormControl('', [Validators.required, this.cardNumberValidator(this.billingDetailsService)]);
    this.cardExpDate = new FormControl('', [Validators.required, this.cardExpDateValidator(this.billingDetailsService)]);
    this.cardCVV = new FormControl('', [Validators.required, this.cardCVVValidator(this.billingDetailsService)]);

    this.billingForm = formBuilder.group({
      'paymentMethodId': this.paymentMethodId
    });

    this.creditCardForm = formBuilder.group({
      'cardName': this.cardName,
      'cardNumber': this.cardNumber,
      'cardExpDate': this.cardExpDate,
      'cardCVV': this.cardCVV
    });

    this.creditCardForm
      .valueChanges
      .subscribe(value => {
        this.creditCard.cardName = value.cardName;
        this.creditCard.cardNumber = value.cardNumber;
        this.creditCard.cardExpDate = value.cardExpDate;
        this.creditCard.cardCVV = value.cardCVV;
      }, error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.billingDetailsService.getPaymentMethods()
      .subscribe( paymentMethods => {
       if (paymentMethods.length > 0) {
         this.paymentMethods = paymentMethods;
       }else {
         // display errors here
       }
    });
  }

  ngOnChanges(): void {
    if (this.modalType === 'edit') {
      this.creditCard = this.importedCreditCard;
      this.cardName.setValue(this.importedCreditCard.cardName);
      this.creditCardExist = true;
    }else {
      this.creditCard = new CreditCard();
      this.cardName.setValue('');
      this.cardNumber.setValue('');
      this.cardExpDate.setValue(new Date());
      this.cardCVV.setValue('');
      this.creditCardExist = false;
    }
  }

  private cardNameValidator(billingDetailsService: BillingDetailsService) {
    let cardNameControl = null;
    let isValidCardName = false;
    let valueChanges = null;
    const subscriberToChangeEvents = function () {
      valueChanges
        .pipe(debounceTime(500),
        distinctUntilChanged(),
        filter(value => { // filter out empty values
          return !!(value);
        }), map((value: string) => {
        return billingDetailsService.isValidCardName(value);
      })).subscribe(value => {
        value.subscribe( otherValue => {
          isValidCardName = otherValue.valid;
          cardNameControl.updateValueAndValidity();
        });
      });
    };

    return (control: FormControl) => {
      if (!cardNameControl) {
        cardNameControl = control;
      }

      if (!valueChanges && control.valueChanges) {
        valueChanges = control.valueChanges;
        subscriberToChangeEvents();
      }

      return isValidCardName ? null : {
        validateCardName: {
          valid: false
        }
      };
    }
  }

  private cardNumberValidator(billingDetailsService: BillingDetailsService) {
    let cardNumberControl = null;
    let isValidCardNumber = false;
    let valueChanges = null;
    const subscriberToChangeEvents = function () {
      valueChanges
        .pipe(debounceTime(500),
        distinctUntilChanged(),
        filter(value => { // filter out empty values
          return !!(value);
        }), map((value: string) => {
        return billingDetailsService.isValidCardNumber(value);
      })).subscribe(value => {
        value.subscribe( otherValue => {
          isValidCardNumber = otherValue.valid;
          cardNumberControl.updateValueAndValidity();
        });
      });
    };

    return (control: FormControl) => {
      if (!cardNumberControl) {
        cardNumberControl = control;
      }

      if (!valueChanges && control.valueChanges) {
        valueChanges = control.valueChanges;
        subscriberToChangeEvents();
      }

      return isValidCardNumber ? null : {
        validateCardNumber: {
          valid: false
        }
      };
    }
  }

  private cardExpDateValidator(billingDetailsService: BillingDetailsService) {
    let cardExpDateControl = null;
    let isValidCardExpDate = false;
    let valueChanges = null;
    const subscriberToChangeEvents = function () {
      valueChanges
        .pipe( debounceTime(500),
        distinctUntilChanged(),
        filter(value => { // filter out empty values
          return !!(value);
        }), map((value: Date) => {
        return billingDetailsService.isValidCardExpDate(value);
      })).subscribe(value => {
        value.subscribe( otherValue => {
          isValidCardExpDate = otherValue.valid;
          cardExpDateControl.updateValueAndValidity();
        });
      });
    };

    return (control: FormControl) => {
      if (!cardExpDateControl) {
        cardExpDateControl = control;
      }

      if (!valueChanges && control.valueChanges) {
        valueChanges = control.valueChanges;
        subscriberToChangeEvents();
      }

      return isValidCardExpDate ? null : {
        validateCardExpDate: {
          valid: false
        }
      };
    }
  }

  private cardCVVValidator(billingDetailsService: BillingDetailsService) {
    let cardCVVControl = null;
    let isValidCardCVV = false;
    let valueChanges = null;
    const subscriberToChangeEvents = function () {
      valueChanges
        .pipe(debounceTime(500),
        distinctUntilChanged(),
        filter(value => { // filter out empty values
          return !!(value);
        }), map((value: string) => {
        return billingDetailsService.isValidCardCVV(value);
      })).subscribe(value => {
        value.subscribe( otherValue => {
          isValidCardCVV = otherValue.valid;
          cardCVVControl.updateValueAndValidity();
        });
      });
    };

    return (control: FormControl) => {
      if (!cardCVVControl) {
        cardCVVControl = control;
      }

      if (!valueChanges && control.valueChanges) {
        valueChanges = control.valueChanges;
        subscriberToChangeEvents();
      }

      return isValidCardCVV ? null : {
        validateCardCVV: {
          valid: false
        }
      };
    }
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.billingDetailsService
      .addCreditCard(this.creditCard)
      .subscribe( creditCard => {
        if (creditCard.creditCardId) {
          this.billingChanged.emit(true);
          this.closeModal.nativeElement.click();
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      });
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;

    this.billingDetailsService
      .updateCreditCard(this.creditCard)
      .subscribe( num => {
        if (num) {
          this.billingChanged.emit(true);
          this.closeModal.nativeElement.click();
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      });
  }
}
