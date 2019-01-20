import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import {User} from '../../user';
import { map, distinctUntilChanged, filter, debounceTime } from 'rxjs/operators';
import { UserService } from '../user.service';
import { Credential } from '../../../authentication/credential';
import {AccessRole} from '../../../access-roles/access.role';

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

  accessRoles: AccessRole[];

  private user: User;
  private credential: Credential;
  private partyAccessRoles: string[];
  private pageSize = 15;

  value: string[];
  doNotDisplayFailureMessage: boolean;
  update = false;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.user = new User();
    this.credential = new Credential();
    this.partyAccessRoles = [];

    this.firstName = new FormControl('', [Validators.required]);
    this.middleName = new FormControl('');
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
        this.partyAccessRoles = value.accessRole;
      }, error2 => {
        console.log(error2);
      });

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    this.findAccessRole('');
    if (this.route.snapshot && this.route.snapshot.data['user']) {
      this.setInputValues(this.route.snapshot.data['user']);
      this.update = true;
    }
  }

  private setInputValues(user: User) {
    this.firstName.setValue(user.firstName);
    this.middleName.setValue(user.middleName);
    this.lastName.setValue(user.lastName);
    this.username.setValue(user.username);
    this.accessRole.setValue(user.partyAccessRoles.map(value => value.accessRole.accessRoleId));
    this.user = user;
  }

  private findAccessRole(value, defaultValues?: string[]) {
    this.userService
      .findAccessRole(value, this.pageSize) // send search request to the backend
      .subscribe(next => { // update the data
        this.accessRoles = next;
        this.value = defaultValues;
      }, error => {
        console.log('findAccessRole error - ' + error);
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

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.userService
      .addUser(this.user, this.credential, this.partyAccessRoles)
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
    this.doNotDisplayFailureMessage = true;
      this.userService
      .updateUser(this.user, this.credential, this.partyAccessRoles)
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
