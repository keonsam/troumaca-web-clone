import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {of } from 'rxjs';
import { filter, flatMap } from "rxjs/operators";
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'forgot.password',
  templateUrl: './forgot.password.component.html',
  styleUrls: ['./forgot.password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private _errorExists: boolean;
  private _messageSent: boolean;
  private type: string;
  private _username: FormControl;
  private _forgotPasswordForm: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder) {

    this.username = new FormControl('', [Validators.required]);
    this.forgotPasswordForm = formBuilder.group({
      'username': this.username,
    });

  }

  get forgotPasswordForm(): FormGroup {
    return this._forgotPasswordForm;
  }

  set forgotPasswordForm(value: FormGroup) {
    this._forgotPasswordForm = value;
  }

  get username(): FormControl {
    return this._username;
  }

  set username(value: FormControl) {
    this._username = value;
  }

  get errorExists(): boolean {
    return this._errorExists;
  }

  set errorExists(value: boolean) {
    this._errorExists = value;
  }

  get messageSent(): boolean {
    return this._messageSent;
  }

  set messageSent(value: boolean) {
    this._messageSent = value;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.messageSent = false;
    this.errorExists = false;
    const values = this.forgotPasswordForm.value;
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    of(values)
      .pipe(filter((value) => this.forgotPasswordForm.valid),
      flatMap((value) => {
        const username = value.username;
        if (regex.test(username)) {
          this.type = 'A text Message';
        }else {
          this.type = 'An e-mail';
        }
        return this.authenticationService
          .forgotPassword(username);
      }))
      .subscribe((value) => {
        if (value) {
          this.messageSent = true;
        } else {
          this.errorExists = true;
        }
      });
  }
}
