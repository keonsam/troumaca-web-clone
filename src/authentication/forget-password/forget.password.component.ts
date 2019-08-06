import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {ChangePassword} from '../change.password';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget.password.component.html',
  styleUrls: ['./forget.password.component.css']
})

export class ForgetPasswordComponent {
  password: FormControl;
  confirmPass: FormControl;
  forgetPasswordForm: FormGroup;
  doNotDisplayFailureMessage = true;
  message: string;
  onNext: EventEmitter<boolean> = new EventEmitter();
  changePassword: ChangePassword;
  loading: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: any,
              public dialogRef: MatDialogRef<ForgetPasswordComponent>,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.changePassword = new ChangePassword();
    this.password = new FormControl('', [Validators.required, this.passwordValidator(this.authenticationService)]);
    this.confirmPass = new FormControl('', [Validators.required, this.checkPasswords.bind(this)]);
    this.forgetPasswordForm = formBuilder.group({
      'password': this.password,
      'confirmPass': this.confirmPass
    });
    this.forgetPasswordForm
      .valueChanges
      .subscribe(value => {
        this.changePassword.newPassword = value.password;
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
        value.subscribe((otherValue: boolean) => {
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

  private checkPasswords(group: FormGroup) {
    const pass = this.password.value;
    const confirmPass = group.value;

    return pass === confirmPass ? null : {password: true}
  }

  onPassword() {
    this.loading = true;

    this.changePassword.code = this.data.code;
    this.changePassword.credentialId = this.data.credentialId;
    this.changePassword.confirmationId = this.data.confirmationId;
    this.doNotDisplayFailureMessage = true;
    this.authenticationService.changePassword(this.changePassword)
      .subscribe(isValid => {
        this.loading = false;
        if (isValid.valid) {
          this.onNext.emit(true);
        } else {
          this.message = 'Password change failed.';
          this.doNotDisplayFailureMessage = false;
        }
      }, error1 => {
        console.log(error1);
        this.loading = false;
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
