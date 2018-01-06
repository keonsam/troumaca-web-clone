import {Component, OnInit} from "@angular/core";
import {SignInService} from "./sign.in.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import {Event} from "./event";
import {SignInModel} from "./sign.in.model";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {Router} from "@angular/router";
import {EventName, EventService} from "../../event/event.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'login',
  templateUrl: './sign.in.component.html',
  styleUrls: ['./sign.in.component.css']
})
export class SignInComponent implements OnInit {

  private _signInForm: FormGroup;
  private _username: FormControl;
  private _password: FormControl;
  private _rememberMe: FormControl;

  private _message:string = "";

  private _errorExists:boolean;

  constructor(private eventService:EventService,
              private formBuilder: FormBuilder,
              private loginService:SignInService,
              private router: Router) {

    this.username = new FormControl("");

    this.password = new FormControl("");

    this.rememberMe = new FormControl("");

    this.signInForm = formBuilder.group({
      "username": this.username,
      "password": this.password,
      "rememberMe": this.rememberMe
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {

    let values = this.signInForm.value;
    Observable
      .of(values)
      .filter((value) => this.signInForm.valid)
      .flatMap((value) => {
        return this.loginService
          .authenticate(this.createSignInModel(value));
      })
      .subscribe(session => {
        // Cookie.set("troumaca-session-id", session.sessionId);
        // if (this.rememberMe.value) {
        //   Cookie.set("troumaca-remember-me", this.rememberMe.value);
        // }
        this.eventService.sendEvent(EventName.LOGIN, this.createEventModel());
        this.errorExists = false;
        this.router.navigate(['/home']);
      }, error => {
        this.errorExists = true;
      });
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  createSignInModel(value) {
    let loginModel:SignInModel = new SignInModel();
    loginModel.emailOrPhone = value.username;
    loginModel.password = value.password;
    loginModel.rememberMe = value.rememberMe;
    return loginModel;
  }

  createEventModel() {
    let event:Event = new Event();
    event.partyId = "123";
    event.timestamp = new Date().getTime();
    event.source = "login.component";
    event.name = "login";

    return event;
  }

  forgotPassword() {
    this.router.navigate(['/login/forgot-password']);
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

  get signInForm(): FormGroup {
    return this._signInForm;
  }

  set signInForm(value: FormGroup) {
    this._signInForm = value;
  }

}