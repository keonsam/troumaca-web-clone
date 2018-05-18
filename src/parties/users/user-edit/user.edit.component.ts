import {Component, OnInit} from "@angular/core";
//import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/first";
import "rxjs/add/operator/single";
import "rxjs/add/operator/take";
import "rxjs/add/operator/switchMap";

import { map, reduce, somethingElse } from "underscore";

import {PartyEventService} from "../../party.event.service";
import {PartyService} from "../../party.service";
import {User} from "../../user";
import {Credential} from "../../credential";
import {PartyAccessRole} from "../../party.access.role";
import {Select2OptionData} from "ng2-select2";

@Component({
  selector: 'user-edit',
  templateUrl:'./user.edit.component.html',
  styleUrls: ['./user.edit.component.css']
})
export class UserEditComponent implements OnInit {

  private partyId: string;
  private sub: any;
  private firstUsername: string;
  private _firstName: FormControl;
  private _middleName: FormControl;
  private _lastName: FormControl;
  private _username: FormControl;
  private _accessRole: FormControl;
  private _accessRoleId: string;

  // private _accessRoleDataService: CompleterData;

  private _userEditForm: FormGroup;

  private user: User;
  private credential: Credential;
  private partyAccessRoles: PartyAccessRole[];

  private pageSize:number = 15;
  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage2: boolean;

  public accessRoleData: Array<Select2OptionData>;
  public options: Select2Options;
  private value: string[];
  private accessRoles: string[];

  constructor(private partyEventService:PartyEventService,
              private partyService: PartyService,
              //private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.user = new User();
    this.credential = new Credential();
    this.partyAccessRoles = [];

    this.firstName = new FormControl("", [Validators.required]);
    this.middleName = new FormControl("", [Validators.required]);
    this.lastName = new FormControl("", [Validators.required]);
    this.username = new FormControl("", [Validators.required, this.usernameEditValidator(partyService)]);
    this.accessRole = new FormControl("", [Validators.required]);

    this.userEditForm = formBuilder.group({
      "firstName": this.firstName,
      "middleName": this.middleName,
      "lastName": this.lastName,
      "username": this.username,
      "accessRole": this.accessRole
    });

    this.userEditForm
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
    };

    this.sub = this.route.params.subscribe(params => {
       this.partyId = params['partyId'];
       this.partyService.getUser(this.partyId)
       .subscribe(user =>{
        this.firstName.setValue(user.firstName);
        this.middleName.setValue(user.middleName);
        this.lastName.setValue(user.lastName);
        this.username.setValue(user.username);
        this.firstUsername = user.username;
        this.user = user;
        this.credential.partyId = user.partyId;
        this.credential.username = user.username;
        this.getPartyAccessRole();
      }, error => {
        console.log(error);
      });
    });

    // this.populateAccessRoleDropDown();
  }


  getPartyAccessRole() {
    this.partyService.getPartyAccessRoleById(this.partyId)
      .subscribe(partyAccessRoles => {
        let values = map(partyAccessRoles, value => value.accessRole.accessRoleId);
        this.accessRole.setValue(values.join(","));
        this.value = values;
        this.partyAccessRoles = partyAccessRoles;
      });
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
  //   this.accessRoleDataService = this.completerService.local([], 'name', 'name');
  //   let that = this;
  //   this.userEditForm.get("accessRole").valueChanges
  //     .debounceTime(1000) // debounce
  //     .filter(value => { // filter out empty values
  //       return !!(value);
  //     })
  //     .subscribe(value => {
  //       console.log("value: " + value);
  //       that.partyService
  //         .findAccessRole(value, that.pageSize) // send search request to the backend
  //         .map(value2 => { // convert results to dropdown data
  //           return value2.map(v2 => {
  //             return {
  //               accessRoleId: v2.accessRoleId,
  //               name: v2.name,
  //             };
  //           })
  //         })
  //         .subscribe(next => { // update the data
  //           console.log("findAccessRole next - " + next);
  //           this.accessRoleDataService = this.completerService.local(next, 'name', 'name');
  //         }, error => {
  //           console.log("findAccessRole error - " + error);
  //         });
  //     });
  // }

  usernameEditValidator(partyService:PartyService) {
    let usernameControl = null;
    let isValidUsername = false;
    let valueChanges = null;
    let that = this;
    let subscriberToChangeEvents = function () {
      valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(value => { // filter out empty values
        return !!(value);
      }).map(value => {
        return partyService.isValidEditUsername(that.partyId,value);
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

  // get accessRoleDataService(): CompleterData {
  //   return this._accessRoleDataService;
  // }
  //
  // set accessRoleDataService(value: CompleterData) {
  //   this._accessRoleDataService = value;
  // }

  get accessRoleId(): string {
    return this._accessRoleId;
  }

  set accessRoleId(value: string) {
    this._accessRoleId = value;
  }

  get userEditForm(): FormGroup {
    return this._userEditForm;
  }

  set userEditForm(value: FormGroup) {
    this._userEditForm = value;
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

  removePartyAccessRoles() {
    this.partyAccessRoles = this.partyAccessRoles.filter(value => {
      if(this.accessRoles.indexOf(value.accessRoleId) > -1) {
        if(!value.partyId) {
          value.partyId = this.partyId;
        }
        return value;
      }
    });
  }

  onCreate() {
    console.log(this.accessRoles);
    this.accessRoles.forEach( value => {
      if(this.partyAccessRoles.findIndex(x => x.accessRoleId === value) < 0){
        this.partyAccessRoles.push(new PartyAccessRole(value));
      }
    });
    console.log(this.partyAccessRoles);
    this.removePartyAccessRoles();
    console.log(this.partyAccessRoles);
    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;
      this.partyService
      .updateUser(this.user, this.partyAccessRoles)
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
