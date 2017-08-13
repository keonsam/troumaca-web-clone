import {Component, OnInit} from "@angular/core";
import {ForgotPasswordService} from "./forgot.password.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'forgot.password',
  templateUrl: './forgot.password.component.html',
  styleUrls: ['./forgot.password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private _errorExists: boolean;
  private _messageSent:boolean;
  private _username: FormControl;
  private _forgotPasswordForm: FormGroup;

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

  constructor(private forgotPasswordService:ForgotPasswordService, private formBuilder: FormBuilder) {
    this.username = new FormControl("");

    this.forgotPasswordForm = formBuilder.group({
      "username": this.username,
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.messageSent = false;
    this.errorExists = false;
    let values = this.forgotPasswordForm.value;
    Observable
      .of(values)
      .filter((value) => this.forgotPasswordForm.valid)
      .flatMap((value) => {
        return this.forgotPasswordService
          .sendForgotPasswordMessage(value.username.value);
      })
      .subscribe((value) => {
        if (value) {
          this.messageSent = true;
        } else {
          this.errorExists = true;
        }
      });
  }
}