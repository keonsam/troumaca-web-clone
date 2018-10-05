import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {User} from '../../user';
import { Credential} from "../../../authentication/credential";
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

  private _firstName: FormControl;
  private _middleName: FormControl;
  private _lastName: FormControl;
  private _username: FormControl;
  private _password: FormControl;
  private _confirmPassword: FormControl;

  private _userMeForm: FormGroup;

  private _user: User;
  private credential: Credential;

  private _doNotDisplayFailureMessage: boolean;
  requiredState= false;
  userExist = false;

  @Input() stepper: boolean;
  @Input() userResponse: UserResponse;
  @Output() userCreated = new EventEmitter<boolean>();

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
    this.username = new FormControl('', null);
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
    }else if (this.userResponse) {
      this.setInputValues(this.userResponse);
    }
  }

  private setInputValues(userResponse: UserResponse) {
    this.userMeForm.get('username').setValidators([Validators.required, this.usernameValidator(this.authService)]);
    this.firstName.setValue(userResponse.user.firstName);
    this.middleName.setValue(userResponse.user.middleName);
    this.lastName.setValue(userResponse.user.lastName);
    this.username.setValue(userResponse.user.username);
    this.user = userResponse.user;
    this.credential.username = userResponse.user.username;
    this.userExist = true;
  }

  usernameValidator(authService: AuthenticationService) {
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

  passwordValidator(authService: AuthenticationService) {
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

  confirmPasswordValidator(password: FormControl) {
    return (c: FormControl) => {
      return password.value === c.value ? null : {
        validateEmail: {
          valid: false
        }
      };
    };
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get firstName(): FormControl {
    return this._firstName;
  }

  set firstName(value: FormControl) {
    this._firstName = value;
  }

  get middleName(): FormControl {
    return this._middleName;
  }

  set middleName(value: FormControl) {
    this._middleName = value;
  }

  get lastName(): FormControl {
    return this._lastName;
  }

  set lastName(value: FormControl) {
    this._lastName = value;
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

  get userMeForm(): FormGroup {
    return this._userMeForm;
  }

  set userMeForm(value: FormGroup) {
    this._userMeForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.userService
      .addUser(this.user)
      .subscribe(value => {
        if (value) {
          if (this.stepper) {
            this.userCreated.emit(true);
          }else {
            this.router.navigate(['/lobby']);
          }
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;
      this.userService
      .updateUser(this.user, this.credential)
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
