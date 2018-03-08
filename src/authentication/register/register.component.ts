import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/first";
import "rxjs/add/operator/single";
import "rxjs/add/operator/take";
import "rxjs/add/operator/switchMap";
import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Credential} from "../credential";
import {Router} from "@angular/router";
//import {isEmail} from 'validator/lib/isEmail';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  private _registrationForm: FormGroup;
  private _username: FormControl;
  private _password: FormControl;
  private _confirmPassword: FormControl;
  private redirectLink: string;

  constructor(private authenticationService:AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.username = new FormControl("", [
      Validators.required,
      this.usernameValidator(authenticationService)
    ]);

    this.password = new FormControl("", [
      Validators.required,
      this.passwordValidator(this.authenticationService)
    ]);

    this.confirmPassword = new FormControl("", [
      Validators.required,
      this.confirmEmailOrPhoneValidator(this.password)
    ]);


    this.registrationForm = formBuilder.group({
      "username": this.username,
      "password": this.password,
      "confirmPassword": this.confirmPassword
    });

  }

  ngOnInit(): void {
  }

  usernameValidator(authenticationService:AuthenticationService) {
    let usernameControl = null;
    let isValidUsername = false;
    let valueChanges = null;

    let subscriberToChangeEvents = function () {
      valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(value => { // filter out empty values
        return !!(value);
      }).map(value => {
        return authenticationService.isValidUsername(value);
      }).subscribe(value => {
        value.subscribe( otherValue => {
          isValidUsername = otherValue;
          usernameControl.updateValueAndValidity();
        });
      });
    };

    return (control:FormControl) => {
       if (!usernameControl) {
         usernameControl = control;
       }

       if (!valueChanges && control.valueChanges) {
         valueChanges = control.valueChanges;
         subscriberToChangeEvents();
       }

      return isValidUsername ? null : {
        validateEmail: {
          valid: false
        }
      };
    }
  }

  passwordValidator(authenticationService:AuthenticationService) {
    let passwordControl = null;
    let isValidPassword = false;
    let valueChanges = null;

    let subscriberToChangeEvents = function () {
      valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(value => { // filter out empty values
        return !!(value);
      }).map(value => {
        return authenticationService.isValidPassword(value);
      }).subscribe(value => {
        value.subscribe( otherValue => {
          isValidPassword = otherValue;
          passwordControl.updateValueAndValidity();
        });
      });
    };

    return (control:FormControl) => {
      if (!passwordControl) {
        passwordControl = control;
      }

      if (!valueChanges && control.valueChanges) {
        valueChanges = control.valueChanges;
        subscriberToChangeEvents();
      }

      return isValidPassword ? null : {
        validateEmail: {
          valid: false
        }
      };
    }
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

  get registrationForm(): FormGroup {
    return this._registrationForm;
  }

  set registrationForm(value: FormGroup) {
    this._registrationForm = value;
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

  generateEmailUUID(credentialId: string) {

    this.authenticationService
    .generateEmailUUID(credentialId)
    .subscribe(next => {
      console.log(next);
      if(next){
        this.router.navigate([`/authentication/email-verification/${next}`]);
      }else{
        // display Errors
      }
    }, error => {
      // display Error
    });
  }

  generatePhoneUUID(credentialId: string) {

    this.authenticationService
    .generatePhoneUUID(credentialId)
    .subscribe(next => {
      if(next){
        this.router.navigate([`/authentication/phone-verification/${next}`]);
      }else{
        // display Errors
      }
    }, error => {
      // display Error
    });
  }

  onSubmit() {
    let credential:Credential = new Credential();
    credential.username = this.username.value;
    credential.password = this.password.value;
    credential.changedPassword = this.confirmPassword.value;
    let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.authenticationService
    .addCredential(credential)
    .subscribe(credential => {
      if (credential.credentialId) {
        let credentialId = credential.credentialId;
        if(regex.test(this.username.value)) {
          this.generateEmailUUID(credentialId);
        } else {
          this.generatePhoneUUID(credentialId);
        }
      } else {
        // display errors
      }
    });
  }

}
