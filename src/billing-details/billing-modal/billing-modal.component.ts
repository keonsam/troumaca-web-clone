import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaymentMethod} from './payment.method';
import {BillingDetailsService} from '../billing.details.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { debounceTime, filter, map, distinctUntilChanged } from 'rxjs/operators';
import {PaymentInformation} from './payment.information';

@Component({
  selector: 'app-billing-modal',
  templateUrl: 'billing-modal.component.html',
  styleUrls: ['billing-modal.component.css']
})

export class BillingModalComponent implements OnInit {

  billingForm: FormGroup;
  creditCardForm: FormGroup;
  paymentMethodId: FormControl;
  cardName: FormControl;
  cardNumber: FormControl;
  cardExpDate: FormControl;
  cardCVV: FormControl;

  private paymentInformation: PaymentInformation;
  paymentMethods: PaymentMethod[];
  doNotDisplayFailureMessage = true;
  paymentInfoExist = false;

  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;

  constructor(private billingDetailsService: BillingDetailsService,
              private formBuilder: FormBuilder) {

    this.paymentMethodId = new FormControl('', [Validators.required]);
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

    this.billingForm.valueChanges
      .subscribe(value => {
        this.paymentInformation.paymentMethodId = value.paymentMethodId;
      });

    this.creditCardForm
      .valueChanges
      .subscribe(value => {
        this.paymentInformation.cardName = value.cardName;
        this.paymentInformation.cardNumber = value.cardNumber;
        this.paymentInformation.cardExpDate = value.cardExpDate;
        this.paymentInformation.cardCVV = value.cardCVV;
      }, error => {
        console.log(error);
      });

    this.billingDetailsService.onOpenModal
      .subscribe(paymentInfo => {
        if (paymentInfo && paymentInfo.paymentId) {
          this.paymentInformation = paymentInfo;
          this.paymentMethodId.setValue(paymentInfo.paymentMethodId);
          this.cardName.setValue(paymentInfo.cardName);
          this.cardNumber.setValue('');
          this.cardExpDate.setValue('');
          this.cardCVV.setValue('');
          this.paymentInfoExist = true;
        } else {
          this.paymentInformation = new PaymentInformation();
          this.paymentMethodId.setValue('');
          this.cardName.setValue('');
          this.cardNumber.setValue('');
          this.cardExpDate.setValue('');
          this.cardCVV.setValue('');
          this.paymentInfoExist = false;
        }
      });
  }

  ngOnInit(): void {
    this.billingDetailsService.getPaymentMethods()
      .subscribe(paymentMethods => {
        if (paymentMethods && paymentMethods.length > 0) {
          this.paymentMethods = paymentMethods;
        }
      });
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
        value.subscribe(otherValue => {
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
        value.subscribe(otherValue => {
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
        .pipe(debounceTime(500),
          distinctUntilChanged(),
          filter(value => { // filter out empty values
            return !!(value);
          }), map((value: any) => {
            return billingDetailsService.isValidCardExpDate(value);
          })).subscribe(value => {
        value.subscribe(otherValue => {
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
        value.subscribe(otherValue => {
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
      .addPaymentInformation(this.paymentInformation)
      .subscribe(paymentInfo => {
        if (paymentInfo && paymentInfo.paymentId) {
          this.billingDetailsService.paymentInfoEdit.next(true);
          this.closeModal.nativeElement.click();
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error1 => {
        this.doNotDisplayFailureMessage = false;
        console.log(error1);
      });
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;

    this.billingDetailsService
      .updatePaymentInformation(this.paymentInformation)
      .subscribe(num => {
        if (num) {
          this.billingDetailsService.paymentInfoEdit.next(true);
          this.closeModal.nativeElement.click();
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error1 => {
        this.doNotDisplayFailureMessage = false;
        console.log(error1);
      });
  }
}
