import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import {User} from '../../user';
import {PartyAccessRole} from '../../party.access.role';
import {Select2OptionData} from 'ng2-select2';
import { map, distinctUntilChanged, filter, debounceTime } from 'rxjs/operators';
import {UserResponse} from '../../user.response';
import { AuthenticationService } from '../../../authentication/authentication.service';
import {UserService} from '../user.service';
import {Credential} from '../../credential';

@Component({
  selector: 'app-user-form',
  templateUrl: './user.form.component.html',
  styleUrls: ['./user.form.component.css']
})
export class UserFormComponent implements OnInit {

  private firstUsername: string;
  private _firstName: FormControl;
  private _middleName: FormControl;
  private _lastName: FormControl;
  private _username: FormControl;
  private _accessRole: FormControl;
  private _accessRoleId: string;
  private _userForm: FormGroup;

  private user: User;
  private credential: Credential;
  private partyAccessRoles: PartyAccessRole[];

  private pageSize = 15;
  private _doNotDisplayFailureMessage: boolean;

  public accessRoleData: Array<Select2OptionData>;
  public options: Select2Options;
  private _value: string[];
  private accessRoles: string[];
  public userExist = false;

  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.user = new User();
    this.credential = new Credential();
    this.partyAccessRoles = [];

    this.firstName = new FormControl('', [Validators.required]);
    this.middleName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.username = new FormControl('', [Validators.required, this.usernameValidator(this.authService)]);
    this.accessRole = new FormControl('', [Validators.required]);

    this.userForm = formBuilder.group({
      'firstName': this.firstName,
      'middleName': this.middleName,
      'lastName': this.lastName,
      'username': this.username,
      'accessRole': this.accessRole
    });

    this.userForm
     .valueChanges
     .subscribe(value => {
       this.user.firstName = value.firstName;
       this.user.middleName = value.middleName;
       this.user.lastName = value.lastName;
       this.credential.username = value.username;
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {

    this.findAccessRole('');

    this.options = {
      width: '100%',
      placeholder: 'Select Access Roles',
      multiple: true,
      closeOnSelect: false,
      containerCss: {
        'display': 'block'
      },
      dropdownCss: {
        'max-height': '200px !important',
        'overflow-y': 'scroll',
        'overflow-x': 'hidden'
      }
    };
    if (this.route.snapshot && this.route.snapshot.data['userResponse']) {
      this.setInputValues(this.route.snapshot.data['userResponse']);
    }
  }

  private setInputValues(userResponse: UserResponse) {
    this.firstName.setValue(userResponse.user.firstName);
    this.middleName.setValue(userResponse.user.middleName);
    this.lastName.setValue(userResponse.user.lastName);
    this.username.setValue(userResponse.user.username);
    this.firstUsername = userResponse.user.username;
    this.user = userResponse.user;
    this.credential.username = userResponse.user.username;
    const values = userResponse.partyAccessRoles.map( value => value.accessRole.accessRoleId);
    this.accessRole.setValue(values.join(','));
    this.value = values;
    this.partyAccessRoles = userResponse.partyAccessRoles;
    this.userExist = true;
  }

  changed(data: {value: string[]}) {
    this.accessRole.setValue(data.value.join(','));
    this.accessRoles = data.value;
  }

  findAccessRole(value) {
    this.userService
      .findAccessRole(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            id: v2.accessRoleId,
            text: v2.name,
          };
        })
      }))
      .subscribe(next => { // update the data
        this.accessRoleData = next;
      }, error => {
        console.log('findAccessRole error - ' + error);
      });
  }

  usernameValidator(authService: AuthenticationService) {
    let usernameControl = null;
    let isValidUsername = false;
    let valueChanges = null;
    const subscriberToChangeEvents = function () {
      valueChanges
      .pipe(debounceTime(1000),
      distinctUntilChanged(),
      filter(value => { // filter out empty values
        return !!(value);
      }), map((value: string) => {
        return authService.isValidUsername(value);
      })).subscribe(value => {
        value.subscribe( otherValue => {
          isValidUsername = otherValue;
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

  get value(): string[] {
    return this._value;
  }

  set value(value: string[]) {
    this._value = value;
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

  get accessRole(): FormControl {
    return this._accessRole;
  }

  set accessRole(value: FormControl) {
    this._accessRole = value;
  }

  get accessRoleId(): string {
    return this._accessRoleId;
  }

  set accessRoleId(value: string) {
    this._accessRoleId = value;
  }

  get userForm(): FormGroup {
    return this._userForm;
  }

  set userForm(value: FormGroup) {
    this._userForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  removePartyAccessRoles(partyAccessRoles) {
    return partyAccessRoles.filter(value => {
      if (this.accessRoles.indexOf(value.accessRoleId) > -1) {
        if (!value.partyId) {
          value.partyId = this.user.partyId;
        }
        return value;
      }
    });
  }

  onCreate() {
    this.accessRoles.forEach( value => {
      this.partyAccessRoles.push(new PartyAccessRole(value));
    });
    this.doNotDisplayFailureMessage = true;
    this.userService
      .addUser(this.user, this.credential, this.partyAccessRoles)
      .subscribe(value => {
        if (value && value.partyId) {
          this.router.navigate(['/parties/users']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate() {
    this.accessRoles.forEach( value => {
      if (this.partyAccessRoles.findIndex(x => x.accessRoleId === value) < 0) {
        this.partyAccessRoles.push(new PartyAccessRole(value));
      }
    });
    this.doNotDisplayFailureMessage = true;
      this.userService
      .updateUser(this.user, this.credential, this.removePartyAccessRoles(this.partyAccessRoles))
      .subscribe(value => {
        if (value) {
          this.router.navigate(['/parties/users']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/parties/users']);
  }

}
