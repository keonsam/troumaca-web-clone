import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import {Event} from '../event';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Router} from '@angular/router';
import {EventService} from '../../event/event.service';
import {AuthenticationService} from '../authentication.service';
import {Credential} from '../credential';


@Component({
  selector: 'lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.css']
})
export class LockComponent implements OnInit {

  private _lockForm: FormGroup;
  private _username: FormControl;
  private _password: FormControl;
  private _rememberMe: FormControl;

  private _message = '';

  private _errorExists: boolean;

  constructor(private eventService: EventService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {

    this.username = new FormControl('');

    this.password = new FormControl('');

    this.rememberMe = new FormControl('');

    this.lockForm = formBuilder.group({
      'username': this.username,
      'password': this.password,
      'rememberMe': this.rememberMe
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {

    const values = this.lockForm.value;
    Observable
      .of(values)
      .filter((value) => this.lockForm.valid)
      .flatMap((value) => {
        return this.authenticationService
          .authenticate(this.createCredential(value));
      })
      .subscribe(session => {
        // Cookie.set("troumaca-session-id", session.sessionId);
        // if (this.rememberMe.value) {
        //   Cookie.set("troumaca-remember-me", this.rememberMe.value);
        // }
        this.eventService.sendLoginEvent(this.createEventModel());
        this.errorExists = false;
        this.router.navigate(['/home']);
      }, error => {
        this.errorExists = true;
      });
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  createCredential(value) {
    const credential: Credential = new Credential();
    credential.username = value.username;
    credential.password = value.password;
    credential.rememberMe = value.rememberMe;
    return credential;
  }

  createEventModel() {
    const event: Event = new Event();
    event.partyId = '123';
    event.timestamp = new Date().getTime();
    event.source = 'lock.component';
    event.name = 'lock';

    return event;
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

  get lockForm(): FormGroup {
    return this._lockForm;
  }

  set lockForm(value: FormGroup) {
    this._lockForm = value;
  }

}
