import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Credential} from "../credential";
import {Router} from '@angular/router';
import { ValidResp} from '../resp.valid';
import {debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import {User} from "../../parties/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  username: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  private credential: Credential;
  private user: User;
  doNotDisplayFailureMessage: boolean;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.credential = new Credential();
    this.user = new User();

    this.username = new FormControl('', [
      Validators.required,
      this.usernameValidator(authenticationService)
    ]);

    this.firstName = new FormControl( '', [Validators.required]);

    this.lastName = new FormControl( '', [Validators.required]);

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
      'firstName': this.firstName,
      'lastName': this.lastName,
      'password': this.password,
      'confirmPassword': this.confirmPassword
    });

    this.registrationForm
      .valueChanges
      .subscribe(value => {
        this.credential.username = value.username;
        this.credential.password = value.password;
        this.user.firstName = value.firstName;
        this.user.lastName = value.lastName;
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
      .pipe(debounceTime(1000), distinctUntilChanged(),  filter(value => { // filter out empty values
        return !!(value);
      }), map((value: string) => {
        return authenticationService.isValidUsername(value);
      })).subscribe(value => {
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
      .pipe(debounceTime(500), distinctUntilChanged(), filter(value => { // filter out empty values
        return !!(value);
      }), map((value: string) => {
        return authenticationService.isValidPassword(value);
      })).subscribe(value => {
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

  onSubmit() {
    this.doNotDisplayFailureMessage = true;

    this.authenticationService
    .addCredential(this.credential, this.user)
    .subscribe(confirmation => {
      if (confirmation) {
        this.router.navigate([`/authentication/confirmations/${confirmation.credentialId}/${confirmation.confirmationId}`]);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
    });
  }

}
