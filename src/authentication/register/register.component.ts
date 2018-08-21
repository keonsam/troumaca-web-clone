






import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Credential} from '../credential';
import {Router} from '@angular/router';
import { ValidResp} from "../resp.valid";

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
  private credential: Credential;
  private _doNotDisplayFailureMessage: boolean;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.credential = new Credential();

    this.username = new FormControl('', [
      Validators.required,
      this.usernameValidator(authenticationService)
    ]);

    this.password = new FormControl('', [
      Validators.required,
      this.passwordValidator(this.authenticationService)
    ]);

    this.confirmPassword = new FormControl('', [
      Validators.required,
      this.confirmEmailOrPhoneValidator(this.password)
    ]);


    this.registrationForm = formBuilder.group({
      'username': this.username,
      'password': this.password,
      'confirmPassword': this.confirmPassword
    });

    this.registrationForm
      .valueChanges
      .subscribe( value => {
        this.credential.username = value.username;
        this.credential.password = value.password;
        this.credential.changedPassword = value.confirmPassword;
      });

    this.doNotDisplayFailureMessage = true;

  }

  ngOnInit(): void {
  }

  usernameValidator(authenticationService: AuthenticationService) {
    let usernameControl = null;
    let isValidUsername = false;
    let valueChanges = null;

    const subscriberToChangeEvents = function () {
      valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(value => { // filter out empty values
        return !!(value);
      }).map(value => {
        return authenticationService.isValidUsername(value);
      }).subscribe(value => {
        value.subscribe( (otherValue: ValidResp) => {
          isValidUsername = otherValue.valid;
          usernameControl.updateValueAndValidity();
        });
      });
    };

    return (control: FormControl) => {
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

  passwordValidator(authenticationService: AuthenticationService) {
    let passwordControl = null;
    let isValidPassword = false;
    let valueChanges = null;

    const subscriberToChangeEvents = function () {
      valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(value => { // filter out empty values
        return !!(value);
      }).map(value => {
        return authenticationService.isValidPassword(value);
      }).subscribe(value => {
        value.subscribe( (otherValue: ValidResp) => {
          isValidPassword = otherValue.valid;
          passwordControl.updateValueAndValidity();
        });
      });
    };

    return (control: FormControl) => {
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

  confirmEmailOrPhoneValidator(password: FormControl) {
    return (c: FormControl) => {
      return password.value === c.value ? null : {
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

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onSubmit() {
    this.doNotDisplayFailureMessage = true;

    this.authenticationService
    .addCredential(this.credential)
    .subscribe(confirmation => {
      const confirmationId = confirmation.confirmationId;
      const credentialId = confirmation.credentialId;
      if (confirmationId && credentialId) {
        this.router.navigate([`/authentication/confirmations/${credentialId}/${confirmationId}`]);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
    });
  }

}
