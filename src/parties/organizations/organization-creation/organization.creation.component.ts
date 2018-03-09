import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
/*import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/first";
import "rxjs/add/operator/single";
import "rxjs/add/operator/take";
import "rxjs/add/operator/switchMap"; */

//import {AuthenticationService} from "../../../authentication/authentication.service";
import {Organization} from "../../organization";
import {PartyEventService} from "../../party.event.service";
import {PartyService} from "../../party.service";
//import {Credential} from "../../credential";

@Component({
  selector: 'organization-creation',
  templateUrl:'./organization.creation.component.html',
  styleUrls: ['./organization.creation.component.css']
})
export class OrganizationCreationComponent implements OnInit {

  private _purpose: FormControl;
  private _name: FormControl;

  private _organizationForm: FormGroup;

  private organization: Organization;
  //private credential: Credential;

  private _doNotDisplayFailureMessage: boolean;
  //private _doNotDisplayFailureMessage2: boolean;

  constructor(private partyEventService: PartyEventService,
              private partyService: PartyService,
              private formBuilder: FormBuilder,
              //private authenticationService: AuthenticationService,
              private router: Router){

   this.organization = new Organization();
   //this.credential = new Credential();

   this.purpose = new FormControl("",[Validators.required]);
   this.name = new FormControl("", [Validators.required/*, this.organizationNameValidator(authenticationService)*/]);

   this.organizationForm = formBuilder.group({
     "purpose": this.purpose,
     "name": this.name
   });

   this.organizationForm.valueChanges
   .subscribe(value => {
     this.organization.purpose = value.purpose;
     this.organization.name = value.name;
     /*this.credential.username = value.name;*/
   }, error2 => {
     console.log(error2);
   });

   this.doNotDisplayFailureMessage = true;
   //this.doNotDisplayFailureMessage2 = true;

  }

  ngOnInit(): void {
  }

  /*organizationNameValidator(authenticationService:AuthenticationService) {
    let nameControl = null;
    let isValidOrganiztionName = false;
    let valueChanges = null;
    let that = this;
    let subscriberToChangeEvents = function () {
      valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(value => { // filter out empty values
        return !!(value);
      }).map(value => {
        return authenticationService.isValidOrganiztionName(that.partyId,value);
      }).subscribe(value => {
        value.subscribe( otherValue => {
          isValidOrganiztionName = otherValue;
          nameControl.updateValueAndValidity();
        });
      });
    };

    return (control:FormControl) => {
       if (!nameControl) {
         nameControl = control;
       }

       if (!valueChanges && control.valueChanges) {
         valueChanges = control.valueChanges;
         subscriberToChangeEvents();
       }

      return isValidOrganiztionName ? null : {
        validateEmail: {
          valid: false
        }
      };
    }
  } */

  get purpose(): FormControl {
    return this._purpose;
  }

  set purpose(value: FormControl) {
    this._purpose = value;
  }

  get name(): FormControl {
    return this._name;
  }

  set name(value: FormControl) {
    this._name = value;
  }

  get organizationForm(): FormGroup {
    return this._organizationForm;
  }

  set organizationForm(value: FormGroup) {
    this._organizationForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  /*get doNotDisplayFailureMessage2(): boolean {
    return this._doNotDisplayFailureMessage2;
  }

  set doNotDisplayFailureMessage2(value: boolean) {
    this._doNotDisplayFailureMessage2 = value;
  }*/


    /*addCredential() {

      this.credential.partyId = this.partyId;
      console.log(this.credential)
      this.partyService
      .addCredential(this.credential)
      .subscribe(value => {
        if (value && value.credentialId) {
          this.router.navigate(['/parties/organizations']);
        } else {
          this.doNotDisplayFailureMessage2 = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage2 = false;
      });
    }*/

    onCreate() {
      this.doNotDisplayFailureMessage = true;
      //this.doNotDisplayFailureMessage2 = true;

        this.partyService
        .addOrganization(this.organization)
        .subscribe(value => {
          if (value && value.partyId) {
            this.router.navigate(['/parties/organizations/listing']);
            //this.partyId = value.partyId;
            //this.addCredential();
          } else {
            this.doNotDisplayFailureMessage = false;
          }
        }, error => {
          console.log(error);
          this.doNotDisplayFailureMessage = false;
        });
    }

    cancel() {
      this.router.navigate(['/parties/organizations/listing']);
    }

}
