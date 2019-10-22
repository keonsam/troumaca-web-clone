import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { Confirmation } from '../confirmation';
import {AUTHENTICATION, LOGIN} from '../../app/routes';
import {MatDialogRef} from '@angular/material';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation.modal.component.html',
  styleUrls: ['./confirmation.modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  confirmationForm: FormGroup;
  confirmationCode: FormControl;
  private confirmation: Confirmation;
  message= 'Incorrect Code';
  doNotDisplaySuccessMessage = true;
  doNotDisplayFailureMessage = true;
  private redirectLink = `/${AUTHENTICATION}/${LOGIN}`;
  success = 'Code Accepted!';
  onPrevious: EventEmitter<boolean> = new EventEmitter();
  onNext: EventEmitter<any> = new EventEmitter();
  faArrowLeft = faArrowLeft;
  faExclamationTriangle = faExclamationTriangle;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    confirmation: Confirmation,
    forgetPassword: any
    username: string
              },
              public dialogRef: MatDialogRef<ConfirmationModalComponent>,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.confirmation = new Confirmation();
    if (this.data) {
      this.confirmation = this.data.confirmation;
    }
    this.confirmationCode = new FormControl('', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(6)]);

    this.confirmationForm = formBuilder.group({
      'confirmationCode': this.confirmationCode,
    });

    this.confirmationForm
      .valueChanges
      .subscribe(value => {
        this.confirmation.code = value.confirmationCode;
      }, error2 => {
        console.error(error2);
      });
  }

  ngOnInit(): void {
    this.subscribeToConfirmation();
  }

  private subscribeToConfirmation() {
    this.confirmationCode.valueChanges
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        filter(value => { // filter out empty values or less than 5
        return !!(value) || value.length < 5;
      }))
      .subscribe( value => {
        this.onSubmit();
      })
  }

  sendConfirmationCode() {
    this.doNotDisplaySuccessMessage = true;
    this.doNotDisplayFailureMessage = true;
    this.authenticationService
      .resendConfirmationCode(this.confirmation.confirmationId, this.confirmation.credentialId)
      .subscribe(isValid => {
        if (isValid.valid) {
          this.success = 'Sent!';
          this.doNotDisplaySuccessMessage = false;
        } else {
          this.message = 'Something went wrong, please try again.';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.error(error);
        this.message = 'Something went wrong, please try again.';
        this.doNotDisplayFailureMessage = false;
      });
  }

  onSubmit() {
    this.doNotDisplaySuccessMessage = true;
    this.doNotDisplayFailureMessage = true;

    this.authenticationService
      .verifyConfirmation(this.confirmation)
      .subscribe(isValid => {
        if (isValid.valid) {
          this.doNotDisplaySuccessMessage = false;
          if (this.data.forgetPassword) {
            setTimeout( () => {
              this.onNext.emit({...this.data,  code: this.confirmation.code });
            }, 1000);
          } else {
            setTimeout( () => {
              this.dialogRef.close();
              this.router.navigate([this.redirectLink]);
            }, 1000);
          }
        }else {
          this.message = 'Incorrect Code';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.error(error);
        console.error(error.message);
        this.message = 'Incorrect Code';
        this.doNotDisplayFailureMessage = false;
      });
  }

  hideError(event: boolean) {
    if (event) {
      this.doNotDisplayFailureMessage = true;
    }
  }
}
