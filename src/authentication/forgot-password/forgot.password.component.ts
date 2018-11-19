import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {AuthenticationService} from '../authentication.service';
import {Credential} from "../credential";
import {Router} from "@angular/router";
import {ValidResponse} from "../valid.response";
import {Confirmation} from "../confirmation";
import {ChangePassword} from "../change.password";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot.password.component.html',
  styleUrls: ['./forgot.password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  errorExists: boolean;
  username: FormControl;
  confirmationCode: FormControl;
  password: FormControl;
  forgotPasswordForm: FormGroup;
  message = '';
  private credential: Credential;
  private confirmation: Confirmation;
  private changePassword: ChangePassword;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.credential = new Credential();
    this.confirmation = new Confirmation();
    this.changePassword = new ChangePassword();

    this.username = new FormControl('', [Validators.required]);
    this.confirmationCode = new FormControl({value: '', disabled: true}, [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)]);
    this.password = new FormControl({value: '', disabled: true}, [
      Validators.required,
      this.passwordValidator(this.authenticationService)
    ]);
    this.forgotPasswordForm = formBuilder.group({
      'username': this.username,
      'confirmationCode': this.confirmationCode,
      'password': this.password
    });

    this.forgotPasswordForm
      .valueChanges
      .subscribe( value => {
        this.credential.username = value.username;
        this.changePassword.username = value.username;
        this.confirmation.code = value.confirmationCode;
        this.changePassword.code = value.confirmationCode;
        this.changePassword.password = value.password;
        this.changePassword.newPassword = value.password;
      });
  }

  ngOnInit(): void {
    console.log(this.password.status);
  }

  private passwordValidator(authenticationService: AuthenticationService) {
    let passwordControl = null;
    let isValidPassword = false;
    let valueChanges = null;

    const subscriberToChangeEvents = function () {
      valueChanges
        .pipe(debounceTime(500), distinctUntilChanged(), filter(value => { // filter out empty values
          return !!(value);
        }), map((value: string) => {
          return authenticationService.isValidPassword(value);
        })).subscribe(value => {
        value.subscribe( (otherValue: ValidResponse) => {
          isValidPassword = otherValue.valid;
          passwordControl.updateValueAndValidity();
        });
      });
    };

    return (control: FormControl) => {
      if (!passwordControl) {
        passwordControl = control;
      }

      if (!valueChanges && control.valueChanges) {
        valueChanges = control.valueChanges;
        subscriberToChangeEvents();
      }

      return isValidPassword ? null : {
        validateEmail: {
          valid: false
        }
      };
    }
  }

  onForgotPassword() {
    this.errorExists = false;
    this.authenticationService.forgotPassword(this.credential)
      .subscribe( value => {
        if (value && value.confirmationId) {
          this.confirmation.credentialId = value.credentialId;
          this.confirmation.confirmationId = value.confirmationId;
          this.changePassword.credentialId = value.credentialId;
          this.confirmationCode.enable();
        }else {
          this.message = 'Username does not exit. Please try again.';
          this.errorExists = true;
        }
      }, error => {
        this.message = 'Username does not exit. Please try again.';
        this.errorExists = true;
      });
  }

  onConfirmationCode() {
    this.errorExists = false;

    this.authenticationService
      .verifyConfirmation(this.confirmation)
      .subscribe(confirmation => {
        if (confirmation && confirmation.status === 'Confirmed') {
          this.password.enable();
        } else if (confirmation && confirmation.status === 'Expired') {
          this.message = 'Confirmation code has expired. Please refresh and enter username again.';
          this.errorExists = true;
        } else {
          this.message = 'Confirmation code does not match or an error has occurred. Please try again or generate a new one below.';
          this.errorExists = true;
        }
      }, error => {
        console.log(error);
        this.message = 'Confirmation code does not match or an error has occurred. Please try again or generate a new one below.';
        this.errorExists = true;
      });
  }

  onSubmit() {
    this.errorExists = false;

    this.authenticationService.changePassword(this.changePassword)
      .subscribe(confirmation => {
        if (confirmation && confirmation.credentialId) {
          this.router.navigate(['/authentication/login']);
        } else {
          this.message = 'Failed to change password. Please check your information and try again.';
          this.errorExists = true;
        }
      }, error1 => {
        console.log(error1);
        this.message = 'Failed to change password. Please check your information and try again.';
        this.errorExists = true;
      });
  }

}
