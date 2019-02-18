import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { Confirmation } from '../confirmation';
import {AUTHENTICATION, CONFIRMATION, FORGOT_PASSWORD, HOME, LOGIN} from '../../app/routes';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  phoneVerificationForm: FormGroup;
  confirmationCode: FormControl;
  private confirmation: Confirmation;
  message= '';
  doNotDisplaySuccessMessage = true;
  doNotDisplayFailureMessage = true;
  private sub: any;
  private redirectLink = `/${AUTHENTICATION}/${LOGIN}`;
  homeLink = `/${HOME}`;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {

    this.confirmationCode = new FormControl('', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)]);

    this.phoneVerificationForm = formBuilder.group({
      'confirmationCode': this.confirmationCode,
    });

    this.phoneVerificationForm
      .valueChanges
      .subscribe(value => {
        this.confirmation.code = value.confirmationCode;
      }, error2 => {
        console.log(error2);
      });

    this.confirmation = new Confirmation();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.confirmation.credentialId = params['credentialId'];
      this.confirmation.confirmationId = params['confirmationId'];
    });
  }

  sendConfirmationCode() {
    this.doNotDisplaySuccessMessage = true;
    this.doNotDisplayFailureMessage = true;

    this.authenticationService
      .resendConfirmationCode(this.confirmation.confirmationId, this.confirmation.credentialId)
      .subscribe(confirmation => {
        if (confirmation && confirmation.status === 'New') {
          this.message = 'If you didn\'t get it in 5 minutes, please try again.';
          this.doNotDisplaySuccessMessage = false;
          setTimeout(() => {
            this.router.navigate([`/${AUTHENTICATION}/${CONFIRMATION}/${confirmation.credentialId}/${confirmation.confirmationId}`]);
            this.doNotDisplaySuccessMessage = true;
            this.doNotDisplayFailureMessage = true;
          }, 2000);
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
          if (this.router.url.indexOf('forgot-password') !== -1) {
            this.redirectLink = `/${AUTHENTICATION}/${FORGOT_PASSWORD}/change/${confirmation.credentialId}/${confirmation.code}`;
          }else {
            this.router.navigate([this.redirectLink]);
          }
        } else if (confirmation && confirmation.status === 'Expired') {
          this.message = 'Expired, please generate a new one below.';
          this.doNotDisplayFailureMessage = false;
        } else {
          this.message = 'Confirmation failed.';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.message = 'Confirmation failed.';
        this.doNotDisplayFailureMessage = false;
      });
  }

}
