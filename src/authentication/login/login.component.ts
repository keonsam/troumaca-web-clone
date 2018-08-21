import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';



import {Event} from '../event';

import {Router} from '@angular/router';
import {EventService} from '../../event/event.service';
import {AuthenticationService} from '../authentication.service';
import {Credential} from '../credential';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _loginForm: FormGroup;
  private _username: FormControl;
  private _password: FormControl;
  private _rememberMe: FormControl;

  private _message = '';

  private _errorExists: boolean;
  private _accountFailed: boolean;

  constructor(private eventService: EventService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {

    this.username = new FormControl('', [
      Validators.required
    ]);

    this.password = new FormControl('', [
      Validators.required
    ]);

    this.rememberMe = new FormControl('');

    this.loginForm = formBuilder.group({
      'username': this.username,
      'password': this.password,
      'rememberMe': this.rememberMe
    });

    this.accountFailed = false;
  }

  ngOnInit(): void {
  }

  createEventModel() {
    const event: Event = new Event();
    event.partyId = '123';
    event.timestamp = new Date().getTime();
    event.source = 'login.component';
    event.name = 'login';

    return event;
  }

  get accountFailed(): boolean {
    return this._accountFailed;
  }

  set accountFailed(value: boolean) {
    this._accountFailed = value;
  }

  get errorExists(): boolean {
    return this._errorExists;
  }

  set errorExists(value: boolean) {
    this._errorExists = value;
  }
  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
  get rememberMe(): FormControl {
    return this._rememberMe;
  }

  set rememberMe(value: FormControl) {
    this._rememberMe = value;
  }
  get password(): FormControl {
    return this._password;
  }

  set password(value: FormControl) {
    this._password = value;
  }
  get username(): FormControl {
    return this._username;
  }

  set username(value: FormControl) {
    this._username = value;
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  set loginForm(value: FormGroup) {
    this._loginForm = value;
  }

  onSubmit() {
    this.errorExists = false;
    const credential: Credential = new Credential();
    credential.username = this.username.value;
    credential.password = this.password.value;
    credential.rememberMe = this.rememberMe.value;

    this.authenticationService
      .authenticate(credential)
      .subscribe(authenticatedCredential => {
        if (authenticatedCredential.authenticateStatus === 'AccountActive') {
          this.eventService.sendLoginEvent(this.createEventModel());
          this.router.navigate(['/home/lobby']);
        }else if (authenticatedCredential.authenticateStatus === 'AccountConfirmed') {
          this.router.navigate(['/create-profile']);
        }else if (authenticatedCredential.authenticateStatus === 'AccountUsernameNotConfirmed') {
          const credentialId = authenticatedCredential.credentialId;
          const confirmationId = authenticatedCredential.confirmationId;
          this.router.navigate([`/authentication/confirmations/${credentialId}/${confirmationId}`]);
        }else {
          console.log(authenticatedCredential.authenticateStatus);
          this.errorExists = true;
        }
      }, error => {
        console.log(error);
        this.errorExists = true;
      });
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

}
