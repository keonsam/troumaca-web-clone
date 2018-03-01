import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import {Event} from "../event";
import "rxjs/add/observable/of";
import {Router} from "@angular/router";
import {EventService} from "../../event/event.service";
import {AuthenticationService} from "../authentication.service";
import {Credential} from "../credential";


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

  private _message:string = "";

  private _errorExists:boolean;

  constructor(private eventService: EventService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {

    this.username = new FormControl("", [
      Validators.required
    ]);

    this.password = new FormControl("", [
      Validators.required
    ]);

    this.rememberMe = new FormControl("");

    this.loginForm = formBuilder.group({
      "username": this.username,
      "password": this.password,
      "rememberMe": this.rememberMe
    });

  }

  ngOnInit(): void {
  }

  createEventModel() {
    let event:Event = new Event();
    event.partyId = "123";
    event.timestamp = new Date().getTime();
    event.source = "login.component";
    event.name = "login";

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

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  set loginForm(value: FormGroup) {
    this._loginForm = value;
  }

  onSubmit() {
    this.errorExists = false;
    let credential:Credential = new Credential();
    credential.username = this.username.value;
    credential.password = this.password.value;
    credential.rememberMe = this.rememberMe.value;

    this.authenticationService
      .authenticate(credential)
      .subscribe(session => {
        if (session.sessionId) {
          this.eventService.sendLoginEvent(this.createEventModel());
          this.errorExists = false;
          this.router.navigate(['/home/lobby']);
        } else {
          // Todo: Put an error on the display
          this.errorExists = true;
        }

      }, error => {
        this.errorExists = true;
      });
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

}