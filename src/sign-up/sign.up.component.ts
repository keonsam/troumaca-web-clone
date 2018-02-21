import {Component, OnInit} from "@angular/core";
import {SignUpService} from "./sign.up.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Cookie} from "ng2-cookies/ng2-cookies";
import {SignUpModel} from "./sign.up.model";

@Component({
  selector: 'sign-up',
  templateUrl: './sign.up.component.html',
  styleUrls: ['./sign.up.component.css']
})
export class SignUpComponent implements OnInit {

  private _errorExists:boolean;
  private _signUpForm:FormGroup;
  private _username:FormControl;
  private _password:FormControl;
  private _rememberMe:FormControl;
  private _confirmPassword:FormControl;
  private _registered: boolean;

  constructor(private signUpService:SignUpService,
              private formBuilder: FormBuilder,
              private router: Router) {

  this.username = new FormControl("", [
    Validators.required,
    this.emailOrPhoneValidator(signUpService)
  ]);


  this.password = new FormControl("", [
    Validators.required
  ]);

  this.confirmPassword = new FormControl("", [
      Validators.required,
      this.confirmEmailOrPhoneValidator(this.password)
  ]);

  this.rememberMe = new FormControl("");

  this.signUpForm = formBuilder.group({
    "username": this.username,
    "password": this.password,
    "confirmPassword" : this.confirmPassword,
    "rememberMe": this.rememberMe
  });

  }

  emailOrPhoneValidator(signUpService:SignUpService) {
    return (c:FormControl) => {
      return signUpService.isEmailOrPassword(c.value) ? null : {
        validateEmail: {
          valid: false
        }
      };
    };
  }

  confirmEmailOrPhoneValidator(password:FormControl) {
    return (c:FormControl) => {
      return password.value == c.value ? null : {
        validateEmail: {
          valid: false
        }
      };
    };
  }

  get username(): FormControl {
    return this._username;
  }

  set username(value: FormControl) {
    this._username = value;
  }

  get password(): FormControl {
    return this._password;
  }

  set password(value: FormControl) {
    this._password = value;
  }

  get confirmPassword(): FormControl {
    return this._confirmPassword;
  }

  set confirmPassword(value: FormControl) {
    this._confirmPassword = value;
  }

  get rememberMe(): FormControl {
    return this._rememberMe;
  }

  set rememberMe(value: FormControl) {
    this._rememberMe = value;
  }

  get signUpForm(): FormGroup {
    return this._signUpForm;
  }

  set signUpForm(value: FormGroup) {
    this._signUpForm = value;
  }

  get errorExists(): boolean {
    return this._errorExists;
  }

  set errorExists(value: boolean) {
    this._errorExists = value;
  }

  get registered(): boolean {
    return this._registered;
  }

  set registered(value: boolean) {
    this._registered = value;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorExists = false;
    this.registered = false;

    console.log("onSubmit");
    let values = this.signUpForm.value;
    Observable
      .of(values)
      .filter((value) => this.signUpForm.valid)
      .flatMap((value) => {
        return this.signUpService.registerPerson(this.createSignInModel(value));
      })
      .subscribe(succeed => {
        if (succeed && this.rememberMe.value) {
          Cookie.set("troumaca-remember-me", this.rememberMe.value);
        }

        if (succeed) {
          this.errorExists = false;
          this.registered = true;
        } else {
          this.errorExists = true;
          this.registered = false;
        }

      }, error => {
        this.errorExists = true;
      });

  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  printChanges() {
    this.signUpForm.valueChanges
      .map((value) => {
        value.username = value.username.toUpperCase();
        return value;
      })
      .filter((value) => this.signUpForm.valid)
      .subscribe((value) => {
        console.log("Model Driven Form valid value: vm = ", JSON.stringify(value));
      });
  }

  private createSignInModel(value: any):SignUpModel {
    var signUpModel:SignUpModel = new SignUpModel();
    signUpModel.password = value.password;
    signUpModel.username = value.username;
    return signUpModel;
  }

}