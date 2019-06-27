import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { Confirmation } from '../confirmation';
import {AUTHENTICATION, LOGIN} from '../../app/routes';
import {MatDialogRef} from '@angular/material';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';

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
  data: any;
  success = 'Code Accepted!';
  onPrevious: EventEmitter<boolean> = new EventEmitter();
  onNext: EventEmitter<boolean> = new EventEmitter();
  faArrowLeft = faArrowLeft;

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.confirmation = new Confirmation();
    this.data = JSON.parse(localStorage.getItem('verification'));
    if (this.data) {
      this.confirmation.credentialId = this.data.credentialId;
      this.confirmation.confirmationId = this.data.confirmationId;
    }
    this.confirmationCode = new FormControl('', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)]);

    this.confirmationForm = formBuilder.group({
      'confirmationCode': this.confirmationCode,
    });

    this.confirmationForm
      .valueChanges
      .subscribe(value => {
        this.confirmation.code = value.confirmationCode;
        if (value.confirmationCode.length === 6) {
          this.onSubmit();
        }
      }, error2 => {
        console.log(error2);
      });

  }

  ngOnInit(): void {
    // this.sub = this.route.params.subscribe(params => {
    //   this.confirmation.credentialId = params['credentialId'];
    //   this.confirmation.confirmationId = params['confirmationId'];
    // });
  }

  sendConfirmationCode() {
    this.doNotDisplaySuccessMessage = true;
    this.doNotDisplayFailureMessage = true;
    this.authenticationService
      .resendConfirmationCode(this.confirmation.confirmationId, this.confirmation.credentialId)
      .subscribe(confirmation => {
        if (confirmation && confirmation.status === 'New') {
          this.success = 'Sent!';
          this.data.credentialId = confirmation.credentialId;
          this.data.confirmationId = confirmation.confirmationId;
          localStorage.setItem('verification', JSON.stringify(this.data));
          this.doNotDisplaySuccessMessage = false;
        } else if (confirmation && confirmation.status === 'Confirmed') {
          this.message = 'Username confirmed, please log in.';
          this.doNotDisplayFailureMessage = false;
        } else {
          this.message = 'Something went wrong, please try again.';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.message = 'Something went wrong, please try again.';
        this.doNotDisplayFailureMessage = false;
      });
  }

  onSubmit() {
    this.doNotDisplaySuccessMessage = true;
    this.doNotDisplayFailureMessage = true;

    this.authenticationService
      .verifyConfirmation(this.confirmation)
      .subscribe(confirmation => {
        if (confirmation && confirmation.status === 'Confirmed') {
          localStorage.removeItem('verification');
          this.doNotDisplaySuccessMessage = false;
          if (this.data.forgetPassword) {
            localStorage.setItem('changePassword', JSON.stringify({
              username: this.data.username,
              credentialId: this.data.credentialId,
              code: confirmation.code
            }));
            setTimeout( () => {
              this.onNext.emit(true);
              // this.router.navigate([this.redirectLink]);
            }, 1000);
          }else {
            setTimeout( () => {
              this.dialogRef.close();
              this.router.navigate([this.redirectLink]);
            }, 1000);
          }
        } else if (confirmation && confirmation.status === 'Expired') {
          this.message = 'Expired, please generate a new one below.';
          this.doNotDisplayFailureMessage = false;
        } else {
          this.message = 'Incorrect Code';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
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
