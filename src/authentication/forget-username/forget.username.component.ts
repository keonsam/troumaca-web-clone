import {Component, EventEmitter} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

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
  onNext: EventEmitter<any> = new EventEmitter();
  loading: boolean;
  faExclamationTriangle = faExclamationTriangle;

  constructor(public dialogRef: MatDialogRef<ForgetUsernameComponent>,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.username = new FormControl('', [Validators.required]);
    this.forgetUsernameForm = formBuilder.group( {
      'username': this.username
    })
  }

  onSubmit() {
    this.loading = true;
    this.doNotDisplayFailureMessage = true;
    this.authenticationService.forgotPassword(this.username.value)
      .subscribe( value => {
        this.loading = false;
        if (value && value.confirmationId) {
          this.onNext.emit({...value, username: this.username.value, forgetPassword: true});
        }else {
          this.message = 'Username does not exit.';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.message = 'Username does not exit.';
        this.loading = false;
        this.doNotDisplayFailureMessage = false;
      });
  }

  hideError(event: boolean) {
    if (event) {
      this.doNotDisplayFailureMessage = true;
    }
  }

}
