import {Component, EventEmitter} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {AUTHENTICATION, CONFIRMATION, FORGOT_PASSWORD, LOGIN} from '../../app/routes';
import {ChangePassword} from '../change.password';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {ValidResponse} from '../valid.response';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget.password.component.html',
  styleUrls: ['./forget.password.component.css']
})

export class ForgetPasswordComponent {
  password: FormControl;
  forgetPasswordForm: FormGroup;
  doNotDisplayFailureMessage = true;
  message: string;
  onNext: EventEmitter<boolean> = new EventEmitter();
  changePassword: ChangePassword;
  data: any;

  constructor(public dialogRef: MatDialogRef<ForgetPasswordComponent>,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.data = JSON.parse(localStorage.getItem('changePassword'));
    this.changePassword = new ChangePassword();
    this.password = new FormControl('', [Validators.required, this.passwordValidator(this.authenticationService)]);
    this.forgetPasswordForm = formBuilder.group( {
      'password': this.password
    });
    this.forgetPasswordForm
      .valueChanges
      .subscribe( value => {
        this.changePassword.password = value.password;
      });
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
        value.subscribe( (otherValue: boolean) => {
          isValidPassword = otherValue;
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
        password: true
      };
    }
  }

  onPassword() {
    this.changePassword.code = this.data.code;
    this.changePassword.credentialId = this.data.credentialId;
    this.changePassword.username = this.data.username;
    this.doNotDisplayFailureMessage = true;
    this.authenticationService.changePassword(this.changePassword)
      .subscribe(changeRes => {
        if (changeRes) {
          localStorage.removeItem('changePassword');
          this.onNext.emit(true);
        } else {
          this.message = 'Password change failed.';
          this.doNotDisplayFailureMessage = false;
        }
      }, error1 => {
        console.log(error1);
        this.message = 'Password change failed.';
        this.doNotDisplayFailureMessage = false;
      });
  }

  hideError(event: boolean) {
    if (event) {
      this.doNotDisplayFailureMessage = true;
    }
  }

}
