import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import {User} from '../../user';
import {PartyAccessRole} from '../../party.access.role';
import {Select2OptionData} from 'ng2-select2';
import { map, distinctUntilChanged, filter, debounceTime } from 'rxjs/operators';
import { UserService } from '../user.service';
import { Credential } from '../../../authentication/credential';

@Component({
  selector: 'app-user-form',
  templateUrl: './user.form.component.html',
  styleUrls: ['./user.form.component.css']
})
export class UserFormComponent implements OnInit {

  firstName: FormControl;
  middleName: FormControl;
  lastName: FormControl;
  username: FormControl;
  accessRole: FormControl;
  userForm: FormGroup;

  private accessRoleId: string;

  private user: User;
  private credential: Credential;
  private partyAccessRoles: PartyAccessRole[];
  private accessRoles: string[];

  private pageSize = 15;
  doNotDisplayFailureMessage: boolean;

  accessRoleData: Array<Select2OptionData>;
  options: Select2Options;
  value: string[];
  userExist = false;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.user = new User();
    this.credential = new Credential();
    this.partyAccessRoles = [];

    this.firstName = new FormControl('', [Validators.required]);
    this.middleName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.username = new FormControl('', [Validators.required, this.usernameValidator(this.userService)]);
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
    }else {
      this.findAccessRole('');
    }
  }

  private setInputValues(user: User) {
    this.firstName.setValue(user.firstName);
    this.middleName.setValue(user.middleName);
    this.lastName.setValue(user.lastName);
    this.username.setValue(user.username);
    this.user = user;
    const values = user.partyAccessRoles.map(value => value.accessRole.accessRoleId);
    this.accessRole.setValue(values.join(','));
    this.partyAccessRoles = user.partyAccessRoles;
    this.userExist = true;
    this.findAccessRole('', values);
  }

  changed(data: {value: string[]}) {
    this.accessRole.setValue(data.value.join(','));
    this.accessRoles = data.value;
  }

  private findAccessRole(value, defaultValues?: string[]) {
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
        this.value = defaultValues;
      }, error => {
        console.log('findAccessRole error - ' + error);
      });
  }

  private usernameValidator(userService: UserService) {
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
        return userService.isValidUsername(value);
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

  private removePartyAccessRoles(partyAccessRoles) {
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
    const newPartyAccessRoles: PartyAccessRole[] = [];
    this.accessRoles.forEach( value => {
      newPartyAccessRoles.push(new PartyAccessRole(value));
    });
    this.doNotDisplayFailureMessage = true;
    this.userService
      .addUser(this.user, this.credential, newPartyAccessRoles)
      .subscribe(value => {
        if (value && value.partyId) {
          this.router.navigate(['/parties/users/listing']);
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
          this.router.navigate(['/parties/users/listing']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/parties/users/listing']);
  }

}
