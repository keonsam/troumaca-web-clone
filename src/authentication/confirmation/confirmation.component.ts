import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { Confirmation } from '../confirmation';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  phoneVerificationForm: FormGroup;
  confirmationCode: FormControl;
  private confirmation: Confirmation;
  message: string;
  username: string;
  showSuccessMessage = false;
  showErrorMessage = false;
  sub: any;

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
    this.showSuccessMessage = false;
    this.showErrorMessage = false;

    this.authenticationService
      .resendConfirmationCode(this.confirmation.confirmationId, this.confirmation.credentialId)
      .subscribe(confirmation => {
        if (confirmation && confirmation.status === 'New') {
          this.message = 'Confirmation code has been sent.\n' +
            '      If you didn\'t get it in 5 minutes, Please try again.';
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.router.navigate([`/authentication/confirmations/${confirmation.credentialId}/${confirmation.confirmationId}`]);
          }, 2000);
        } else if (confirmation && confirmation.status === 'Confirmed') {
          this.message = 'Username has already been confirmed, please log in.';
          this.showErrorMessage = true;
        } else {
          this.message = 'Something went wrong, please try again.';
          this.showErrorMessage = true;
        }
      }, error => {
        console.log(error);
        this.message = 'Something went wrong, please try again.';
        this.showErrorMessage = true;
      });
  }

  onSubmit() {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;

    this.authenticationService
      .verifyConfirmation(this.confirmation)
      .subscribe(confirmation => {
        if (confirmation && confirmation.status === 'Confirmed') {
          this.message = 'Your account has been confirmed.\n' +
            '      Please login.';
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.router.navigate(['/authentication/login']);
          }, 1000);
        } else if (confirmation && confirmation.status === 'Expired') {
          this.message = 'Confirmation code has been expired. \n' +
            '      Please generate a new one below.';
          this.showErrorMessage = true;
        } else {
          this.message = 'Confirmation code does not match or an error has occurred. \n' +
            '      Please try again or generate a new one below.';
          this.showErrorMessage = true;
        }
      }, error => {
        console.log(error);
        this.message = 'Confirmation code does not match or an error has occurred. \n' +
          '      Please try again or generate a new one below.';
        this.showErrorMessage = true;
      });
  }

}
