import {Component, OnInit} from "@angular/core";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
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
import {PartyAccessRole} from "../../party.access.role";
import {AccessRole} from "../../../access-roles/access.role";

import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'user-creation',
  templateUrl:'./user.creation.component.html',
  styleUrls: ['./user.creation.component.css']
})
export class UserCreationComponent implements OnInit {

  private _firstName: FormControl;
  private _middleName: FormControl;
  private _lastName: FormControl;
  private _username: FormControl;
  private _accessRole: FormControl;

  private _accessRoleId: string;

  // private _accessRoleDataService: CompleterData;

  private _userForm: FormGroup;

  private user: User;
  private partyAccessRoles: PartyAccessRole[];
  private credential: Credential;

  private pageSize:number = 15;
  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage2: boolean;

  public accessRoleData: Array<Select2OptionData>;
  public options: Select2Options;
  private accessRoles: string[];

  constructor(private partyEventService: PartyEventService,
              private partyService: PartyService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.user = new User();
    this.credential = new Credential();
    this.partyAccessRoles = [];

    this.firstName = new FormControl("", [Validators.required]);
    this.middleName = new FormControl("", [Validators.required]);
    this.lastName = new FormControl("", [Validators.required]);
    this.username = new FormControl("", [Validators.required, this.usernameValidator(partyService)]);
    this.accessRole = new FormControl("", [Validators.required]);


    this.userForm = formBuilder.group({
      "firstName": this.firstName,
      "middleName": this.middleName,
      "lastName": this.lastName,
      "username": this.username,
      "accessRole": this.accessRole
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
    this.findAccessRole("");

    this.options = {
      width: "100%",
      placeholder: "Select Access Roles",
      multiple: true,
      closeOnSelect: false,
      containerCss: {
        "display": "block"
      },
      dropdownCss: {
        "max-height": "200px !important",
        "overflow-y": "scroll",
        "overflow-x": "hidden"
      }
    }
  }

  changed(data: {value: string[]}) {
    this.accessRole.setValue(data.value.join(","));
    this.accessRoles = data.value;
  }

  findAccessRole(value) {
    this.partyService
      .findAccessRole(value, this.pageSize) // send search request to the backend
      .map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            id: v2.accessRoleId,
            text: v2.name,
          };
        })
      })
      .subscribe(next => { // update the data
        this.accessRoleData = next;
      }, error => {
        console.log("findAccessRole error - " + error);
      });
  }

  // populateAccessRoleDropDown() {
  //   this.findAccessRole("");
  //   this.userForm.get("accessRole").valueChanges
  //     //.debounceTime(1000) // debounce
  //     .filter(value => { // filter out empty values
  //       return !!(value);
  //     })
  //     .subscribe(value => {
  //       this.findAccessRole(value);
  //     });
  // }
  //
  // findAccessRole(value) {
  //   this.partyService
  //     .findAccessRole(value, this.pageSize) // send search request to the backend
  //     .map(value2 => { // convert results to dropdown data
  //       return value2.map(v2 => {
  //         return {
  //           accessRoleId: v2.accessRoleId,
  //           name: v2.name,
  //         };
  //       })
  //     })
  //     .subscribe(next => { // update the data
  //       this.accessRoleDataService = this.completerService.local(next, 'name', 'name');
  //     }, error => {
  //       console.log("findAccessRole error - " + error);
  //     });
  // }

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

  // get accessRoleDataService(): CompleterData {
  //   return this._accessRoleDataService;
  // }
  //
  // set accessRoleDataService(value: CompleterData) {
  //   this._accessRoleDataService = value;
  // }

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

  // onAccessRoleSelect(selected: CompleterItem) {
  //   if (selected) {
  //     this.partyAccessRole.accessRole = selected.originalObject;
  //   }
  // }

  getAccessRole(id: string) {
    return this.accessRoleData.find(x => x.id === id).text;
  }

  onCreate() {

    this.accessRoles.forEach( value => {
      this.partyAccessRoles.push(new PartyAccessRole(value, this.getAccessRole(value)));
    });
    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;
      this.partyService
      .addUser(this.user, this.partyAccessRoles)
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

  cancel() {
    this.router.navigate(['/parties/users']);
  }

}
