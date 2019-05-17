import {Component, EventEmitter} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {AUTHENTICATION, CONFIRMATION, FORGOT_PASSWORD} from '../../app/routes';

@Component({
  selector: 'app-forget-username',
  templateUrl: './forget.username.component.html',
  styleUrls: ['./forget.username.component.css']
})

export class ForgetUsernameComponent {
  username: FormControl;
  forgetUsernameForm: FormGroup;
  doNotDisplayFailureMessage = true;
  message: string;
  onNext: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ForgetUsernameComponent>,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.username = new FormControl('', [Validators.required]);
    this.forgetUsernameForm = formBuilder.group( {
      'username': this.username
    })
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  onSubmit() {
    this.doNotDisplayFailureMessage = true;
    this.authenticationService.forgotPassword(this.username.value)
      .subscribe( value => {
        if (value && value.confirmationId) {
          localStorage.setItem('verification', JSON.stringify({
            usernameType: this.validateEmail(this.username.value) ? 'email' : 'mobile',
            username: this.username.value,
            credentialId: value.credentialId,
            confirmationId: value.confirmationId,
            forgetPassword: true,
          }));
          this.onNext.emit(true);
        }else {
          this.message = 'Username does not exit.';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.message = 'Username does not exit.';
        this.doNotDisplayFailureMessage = false;
      });
  }

  hideError(event: boolean) {
    if (event) {
      this.doNotDisplayFailureMessage = true;
    }
  }

}
