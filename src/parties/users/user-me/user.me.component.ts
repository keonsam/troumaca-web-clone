import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {User} from '../../user';
import { Credential} from '../../../authentication/credential';
import { filter, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AuthenticationService} from '../../../authentication/authentication.service';
import {UserService} from '../user.service';
import {UserResponse} from '../../user.response';

@Component({
  selector: 'app-user-me',
  templateUrl: './user.me.component.html',
  styleUrls: ['./user.me.component.css']
})
export class UserMeComponent implements OnInit {

  firstName: FormControl;
  middleName: FormControl;
  lastName: FormControl;
  username: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  userMeForm: FormGroup;

  private user: User;
  private credential: Credential;

  doNotDisplayFailureMessage: boolean;
  requiredState = false;

  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.user = new User();
    this.credential = new Credential();

    this.firstName = new FormControl('', [Validators.required]);
    this.middleName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.username = new FormControl('', [Validators.required, this.usernameValidator(this.authService)]);
    this.password = new FormControl('');
    this.confirmPassword = new FormControl('');

    this.userMeForm = formBuilder.group({
      'firstName': this.firstName,
      'middleName': this.middleName,
      'lastName': this.lastName,
      'username': this.username,
      'password': this.password,
      'confirmPassword': this.confirmPassword
    });

    this.userMeForm
     .valueChanges
     .subscribe(value => {
       this.user.firstName = value.firstName;
       this.user.middleName = value.middleName;
       this.user.lastName = value.lastName;
       this.credential.username = value.username;
       this.credential.password = value.password;
     }, error2 => {
       console.log(error2);
     });

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    this.password
      .valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(value => {
        if (value && !this.requiredState) {
          this.requiredState = true;
          this.userMeForm.get('password').setValidators([Validators.required, this.passwordValidator(this.authService)]);
          this.userMeForm.get('confirmPassword').setValidators([Validators.required, this.confirmPasswordValidator(this.password)]);
          this.userMeForm.get('confirmPassword').updateValueAndValidity();
        } else if (!value) {
          this.requiredState = false;
          this.userMeForm.get('password').setValidators(null);
          this.userMeForm.get('confirmPassword').setValidators(null);
          this.userMeForm.get('confirmPassword').updateValueAndValidity();
        }
    this.userMeForm.updateValueAndValidity();
    });
    
    if (this.route.snapshot && this.route.snapshot.data['userResponse']) {
      this.setInputValues(this.route.snapshot.data['userResponse']);
    }
  }

  private setInputValues(userResponse: UserResponse) {
    this.firstName.setValue(userResponse.user.firstName);
    this.middleName.setValue(userResponse.user.middleName);
    this.lastName.setValue(userResponse.user.lastName);
    this.username.setValue(userResponse.user.username);
    this.user = userResponse.user;
  }

  private usernameValidator(authService: AuthenticationService) {
    let usernameControl = null;
    let isValidUsername = false;
    let valueChanges = null;
    const that = this;
    const subscriberToChangeEvents = function () {
      valueChanges
      .pipe(debounceTime(1000),
      distinctUntilChanged(),
      filter(value => { // filter out empty values
        return !!(value);
      }), map((value: string) => {
        return authService.isValidUsername(value, that.user.partyId);
      })).subscribe(value => {
        value.subscribe( otherValue => {
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

  private passwordValidator(authService: AuthenticationService) {
    let passwordControl = null;
    let isValidPassword = false;
    let valueChanges = null;

    const subscriberToChangeEvents = function () {
      valueChanges
      .pipe(debounceTime(1000),
      distinctUntilChanged(),
      filter(value => { // filter out empty values
        return !!(value);
      }), map((value: string) => {
        return authService.isValidPassword(value);
      })).subscribe(value => {
        value.subscribe( otherValue => {
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

  private confirmPasswordValidator(password: FormControl) {
    return (c: FormControl) => {
      return password.value === c.value ? null : {
        validateEmail: {
          valid: false
        }
      };
    };
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;
      this.userService
      .updateUserMe(this.user, this.credential)
      .subscribe(value => {
        if (value) {
          this.router.navigate(['/lobby']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

}
