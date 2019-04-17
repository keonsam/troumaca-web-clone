import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import { Person } from './person';
import { map, distinctUntilChanged, filter, debounceTime } from 'rxjs/operators';
import { Credential } from '../../../authentication/credential';
import {AccessRole} from '../../../access-roles/access.role';
import { PEOPLE } from '../../../app/routes';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-form',
  templateUrl: './people.form.component.html',
  styleUrls: ['./people.form.component.css']
})
export class PeopleFormComponent implements OnInit {

  firstName: FormControl;
  middleName: FormControl;
  lastName: FormControl;
  username: FormControl;
  accessRole: FormControl;
  peopleForm: FormGroup;

  accessRoles: AccessRole[];

  private people: Person;
  private credential: Credential;
  private partyAccessRoles: string[];
  private pageSize = 15;

  doNotDisplayFailureMessage: boolean;
  update = false;
  private peopleLink = `/${PEOPLE}`;

  constructor(private peopleService: PeopleService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.people = new Person();
    this.credential = new Credential();
    this.partyAccessRoles = [];

    this.firstName = new FormControl('', [Validators.required]);
    this.middleName = new FormControl('');
    this.lastName = new FormControl('', [Validators.required]);
    this.username = new FormControl('');
    // this.username = new FormControl('', [this.usernameValidator(this.peopleService)]);
    this.accessRole = new FormControl('');

    this.peopleForm = formBuilder.group({
      'firstName': this.firstName,
      'middleName': this.middleName,
      'lastName': this.lastName,
      'username': this.username,
      'accessRole': this.accessRole
    });

    this.peopleForm
      .valueChanges
      .subscribe(value => {
        this.people.firstName = value.firstName;
        this.people.middleName = value.middleName;
        this.people.lastName = value.lastName;
        this.credential.username = value.username;
        this.partyAccessRoles = value.accessRole;
      }, error2 => {
        console.log(error2);
      });

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    this.findAccessRole('');
    if (this.route.snapshot && this.route.snapshot.data['people']) {
      this.setInputValues(this.route.snapshot.data['people']);
      this.update = true;
    }
  }

  private setInputValues(people: Person) {
    this.firstName.setValue(people.firstName);
    this.middleName.setValue(people.middleName);
    this.lastName.setValue(people.lastName);
    // this.username.setValue(people.username);
    // this.accessRole.setValue(people.partyAccessRoles.map(value => value.accessRole.accessRoleId));
    this.people = people;
  }

  private findAccessRole(value) {
    this.peopleService
      .findAccessRole(value, this.pageSize) // send search request to the backend
      .subscribe(next => { // update the data
        this.accessRoles = next;
      }, error => {
        console.log('findAccessRole error - ' + error);
      });
  }

  private usernameValidator(peopleService: PeopleService) {
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
        return peopleService.isValidUsername(value, that.people.partyId);
      })).subscribe(value => {
        value.subscribe( otherValue => {
          isValidUsername = otherValue.valid;
          usernameControl.updateValueAndValidity();
        });
      });
    };

    return (control: FormControl) => {
      if (!control.value) {
        return null;
      }
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
    this.peopleService
      .addPerson(this.people, this.credential, this.partyAccessRoles)
      .subscribe(value => {
        if (value && value.partyId) {
          this.router.navigate([`${this.peopleLink}/listing`]);
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
      this.peopleService
      .updatePerson(this.people, this.credential, this.partyAccessRoles)
      .subscribe(value => {
        if (value) {
          this.router.navigate([`${this.peopleLink}/listing`]);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate([`${this.peopleLink}/listing`]);
  }

}
