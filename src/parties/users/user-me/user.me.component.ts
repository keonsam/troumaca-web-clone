import {Component, OnInit, ViewChild} from "@angular/core";
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
import {AuthenticationService} from "../../../authentication/authentication.service";
import {PartyService} from "../../party.service";
import {Person} from "../../person";
import {Credential} from "../../credential";

@Component({
  selector: 'user-me',
  templateUrl:'./user.me.component.html',
  styleUrls: ['./user.me.component.css']
})
export class UserMeComponent implements OnInit {

  private partyId: string;
  private firstUsername: string;
  private _firstName: FormControl;
  private _middleName: FormControl;
  private _lastName: FormControl;
  private _username: FormControl;
  private _currentPassword: FormControl;
  private _newPassword: FormControl;
  private _confirmPassword: FormControl;

  private _meEditForm: FormGroup;

  private person: Person;
  private credential: Credential;

  private imageChangedEvent: any = '';
  private croppedImage: any = '';

  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage2: boolean;

  constructor(private partyEventService:PartyEventService,
              private partyService: PartyService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.person = new Person();
    this.credential = new Credential();

    this.firstName = new FormControl("", [Validators.required]);
    this.middleName = new FormControl("", [Validators.required]);
    this.lastName = new FormControl("", [Validators.required]);
    this.username = new FormControl("", [Validators.required, this.usernameValidator(this.authenticationService)]);
    this.currentPassword = new FormControl("", [Validators.required, this.currentPasswordValidator(this.authenticationService)]);
    this.newPassword = new FormControl("", [Validators.required, this.passwordValidator(this.authenticationService)]);
    this.confirmPassword = new FormControl("", [Validators.required, this.confirmEmailOrPhoneValidator(this.newPassword)]);

    this.meEditForm = formBuilder.group({
      "firstName": this.firstName,
      "middleName": this.middleName,
      "lastName": this.lastName,
      "username": this.username,
      "currentPassword": this.currentPassword,
      "newPassword": this.newPassword,
      "confirmPassword": this.confirmPassword
    });

    this.meEditForm
     .valueChanges
     .subscribe(value => {
       this.person.firstName = value.firstName;
       this.person.middleName = value.middleName;
       this.person.lastName = value.lastName;
       this.person.username = value.username;
       this.credential.password = value.password;
       this.credential.username = value.username;
       console.log(value);
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
     this.doNotDisplayFailureMessage2 = true;
  }

  ngOnInit(): void {
    let that = this;
    this.partyId = "953ac0b2-4ab7-404a-86c8-904090e1748d";
       this.partyService.getPerson(this.partyId)
       .subscribe(person =>{
        this.firstName.setValue(person.firstName);
        this.middleName.setValue(person.middleName);
        this.lastName.setValue(person.lastName);
        this.username.setValue(person.username);
        this.person = person;
        this.credential.partyId = person.partyId;
        this.credential.username = person.username;
      }, error => {
        console.log(error);
      });
  }

  usernameValidator(authenticationService:AuthenticationService) {
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
        return authenticationService.isValidUsername(value);
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

  currentPasswordValidator(authenticationService: AuthenticationService) {
    let passwordControl = null;
    let isValidPassword = false;
    let valueChanges = null;

    let subscriberToChangeEvents = function () {
      valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(value => { // filter out empty values
        return !!(value);
      }).map(value => {
        return authenticationService.isValidCurrentPassword(value);
      }).subscribe(value => {
        value.subscribe( otherValue => {
          isValidPassword = otherValue;
          passwordControl.updateValueAndValidity();
        });
      });
    };

    return (control:FormControl) => {
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

  passwordValidator(authenticationService:AuthenticationService) {
    let passwordControl = null;
    let isValidPassword = false;
    let valueChanges = null;

    let subscriberToChangeEvents = function () {
      valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(value => { // filter out empty values
        return !!(value);
      }).map(value => {
        return authenticationService.isValidPassword(value);
      }).subscribe(value => {
        value.subscribe( otherValue => {
          isValidPassword = otherValue;
          passwordControl.updateValueAndValidity();
        });
      });
    };

    return (control:FormControl) => {
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

  confirmEmailOrPhoneValidator(password:FormControl) {
    return (c:FormControl) => {
      return password.value == c.value ? null : {
        validateEmail: {
          valid: false
        }
      };
    };
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

  get currentPassword(): FormControl {
    return this._currentPassword;
  }

  set currentPassword(value: FormControl) {
    this._currentPassword = value;
  }

  get newPassword(): FormControl {
    return this._newPassword;
  }

  set newPassword(value: FormControl) {
    this._newPassword = value;
  }

  get confirmPassword(): FormControl {
    return this._confirmPassword;
  }

  set confirmPassword(value: FormControl) {
    this._confirmPassword = value;
  }

  get meEditForm(): FormGroup {
    return this._meEditForm;
  }

  set meEditForm(value: FormGroup) {
    this._meEditForm = value;
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  uploadPhoto() {
    console.log(this.croppedImage);
    this.partyService
    .updateUserPhoto(this.partyId, this.croppedImage)
    .subscribe(value => {
      if(value){
      console.log(value)
      }else {
        console.log("error");
      }
    }, error => {
      console.log(error);
    });
  }

  updateCredential() {
    this.partyService
    .updateCredential(this.credential)
    .subscribe(value => {
      if (value) {
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
      this.partyService
      .updatePerson(this.person)
      .subscribe(value => {
        if (value) {
          if(this.username.value != this.firstUsername){
           this.updateCredential();
          }else {
           this.router.navigate(['/parties/users']);
          }
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
