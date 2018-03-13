import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/first";
import "rxjs/add/operator/single";
import "rxjs/add/operator/take";
import "rxjs/add/operator/switchMap";

import {PartyEventService} from "../../party.event.service";
import {PartyService} from "../../party.service";
import {User} from "../../user";
import {Credential} from "../../credential";

@Component({
  selector: 'user-creation',
  templateUrl:'./user.creation.component.html',
  styleUrls: ['./user.creation.component.css']
})
export class UserCreationComponent implements OnInit {

  private partyId: string;
  private _firstName: FormControl;
  private _middleName: FormControl;
  private _lastName: FormControl;
  private _username: FormControl;


  private _userForm: FormGroup;

  private user: User;
  private credential: Credential;

  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage2: boolean;

  constructor(private partyEventService: PartyEventService,
              private partyService: PartyService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.user = new User();
    this.credential = new Credential();

    this.firstName = new FormControl("", [Validators.required]);
    this.middleName = new FormControl("", [Validators.required]);
    this.lastName = new FormControl("", [Validators.required]);
    this.username = new FormControl("", [Validators.required, this.usernameValidator(partyService)]);

    this.userForm = formBuilder.group({
      "firstName": this.firstName,
      "middleName": this.middleName,
      "lastName": this.lastName,
      "username": this.username
    });

    this.userForm
     .valueChanges
     .subscribe(value => {
       this.user.firstName = value.firstName;
       this.user.middleName = value.middleName;
       this.user.lastName = value.lastName;
       this.user.username = value.username;
       this.credential.username = value.username;
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
     this.doNotDisplayFailureMessage2 = true;
  }


  ngOnInit(): void {
  }

  usernameValidator(partyService:PartyService) {
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
        return partyService.isValidUsername(value);
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

  get doNotDisplayFailureMessage2(): boolean {
    return this._doNotDisplayFailureMessage2;
  }

  set doNotDisplayFailureMessage2(value: boolean) {
    this._doNotDisplayFailureMessage2 = value;
  }

  addCredential() {
    this.credential.partyId = this.partyId;
    console.log(this.credential)
    this.partyService
    .addCredential(this.credential)
    .subscribe(value => {
      if (value && value.credentialId) {
        this.router.navigate(['/parties/users']);
      } else {
        this.doNotDisplayFailureMessage2 = false;
      }
    }, error => {
      console.log(error);
      this.doNotDisplayFailureMessage2 = false;
    });
  }

  onCreate() {

    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;
    if(!this.partyId) {
      this.partyService
      .addUser(this.user)
      .subscribe(value => {
        if (value && value.partyId) {
          this.partyId = value.partyId;
          this.addCredential();
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
    } else {
      this.addCredential();
    }
  }

  cancel() {
    this.router.navigate(['/parties/users']);
  }

}
