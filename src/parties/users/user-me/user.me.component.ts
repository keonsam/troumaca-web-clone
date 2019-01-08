import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {User} from '../../user';
import { Credential} from '../../../authentication/credential';
import { filter, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import {UserService} from '../user.service';

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

  doNotDisplayFailureMessage: boolean;
  errorMessage: string;
  requiredState = false;

  private user: User;
  private credential: Credential;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.user = new User();
    this.credential = new Credential();

    this.firstName = new FormControl('', [Validators.required]);
    this.middleName = new FormControl('');
    this.lastName = new FormControl('', [Validators.required]);
    this.username = new FormControl('', [Validators.required, this.usernameValidator(this.userService)]);
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
    this.password.valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(value => {
        if (value && !this.requiredState) {
          this.requiredState = true;
          this.userMeForm.get('password').setValidators([Validators.required, this.passwordValidator(this.userService)]);
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

    this.getUserMe()
  }

  private getUserMe() {
    this.userService.getUser('profile')
      .subscribe( userRes => {
        if (userRes) {
          this.firstName.setValue(userRes.firstName);
          this.middleName.setValue(userRes.middleName);
          this.lastName.setValue(userRes.lastName);
          this.username.setValue(userRes.username);
          this.user = userRes;
        }
      }, error => {
        this.errorMessage = 'Failed to get profile, please refresh.';
        this.doNotDisplayFailureMessage = false;
      });
  }

  private usernameValidator(userService: UserService) {
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
        return userService.isValidUsername(value, that.user.partyId);
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
        validateEmail: true
      };
    }
  }

  private passwordValidator(userService: UserService) {
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
        return userService.isValidPassword(value);
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
        password: true
      };
    }
  }

  private confirmPasswordValidator(password: FormControl) {
    return (c: FormControl) => {
      return password.value === c.value ? null : {
        password: true
      };
    };
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;
      this.userService
      .updateUser(this.user, this.credential)
      .subscribe(value => {
        if (value) {
          this.router.navigate(['/lobby']);
        } else {
          this.errorMessage = 'Failed to update profile, please try again';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.errorMessage = 'Failed to update profile, please try again';
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {

  }

}
