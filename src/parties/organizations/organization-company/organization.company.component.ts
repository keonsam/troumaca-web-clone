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

import {PartyEventService} from "../../party.event.service";
//import {AuthenticationService} from "../../../authentication/authentication.service";
import {PartyService} from "../../party.service";
import {Organization} from "../../organization";
//import {Credential} from "../../credential";

@Component({
  selector: 'organization-company',
  templateUrl:'./organization.company.component.html',
  styleUrls: ['./organization.company.component.css']
})
export class OrganizationCompanyComponent implements OnInit {

  private partyId: string;
  private organizationName: string;
  private _purpose: FormControl;
  private _name: FormControl;
  private _currentPassword: FormControl;
  private _newPassword: FormControl;
  private _confirmPassword: FormControl;

  private _companyEditForm: FormGroup;

  private organization: Organization;
  //private credential: Credential;

  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private backgroundImage: any = '';

  private _doNotDisplayFailureMessage: boolean;
  //private _doNotDisplayFailureMessage2: boolean;
  private requiredState: boolean = false;

  constructor(private partyEventService:PartyEventService,
              private partyService: PartyService,
              //private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.organization = new Organization();
    //this.credential = new Credential();

    this.purpose = new FormControl("", [Validators.required]);
    this.name = new FormControl("", [Validators.required/*, this.organizationNameValidator(this.authenticationService)*/]);
    /*this.currentPassword = new FormControl("", [Validators.required, this.currentPasswordValidator(this.authenticationService)]);
    this.newPassword = new FormControl("");
    this.confirmPassword = new FormControl("");*/

    this.companyEditForm = formBuilder.group({
      "purpose": this.purpose,
      "name": this.name
      /*"currentPassword": this.currentPassword,
      "newPassword": this.newPassword,
      "confirmPassword": this.confirmPassword*/
    });

    this.companyEditForm
     .valueChanges
     .subscribe(value => {
       this.organization.purpose = value.purpose;
       this.organization.name = value.name;
       /*this.credential.password = value.currentPassword;
       this.credential.username = value.name;*/
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
     //this.doNotDisplayFailureMessage2 = true;
  }

  ngOnInit(): void {
    let that = this;
    // this need fixing
    /*this.companyEditForm.get("newPassword").valueChanges
    .subscribe(value => {
      if(value.length == 1 && !this.requiredState){
      this.companyEditForm.get("newPassword").setValidators([Validators.required, this.passwordValidator(this.authenticationService)]);
      this.companyEditForm.get("confirmPassword").setValidators([Validators.required, this.confirmEmailOrPhoneValidator(this.newPassword)]);
      this.requiredState = true;
    }else if (!value) {
      this.companyEditForm.get("newPassword").setValidators(null);
      this.companyEditForm.get("confirmPassword").setValidators(null);
      this.companyEditForm.get("confirmPassword").updateValueAndValidity();
      this.requiredState = false;
    }
  }); */

       this.partyId = "3e343852-ee99-4b56-af89-4099a14d60a3";
       this.partyService.getOrganization(this.partyId)
       .subscribe(organization =>{
        this.purpose.setValue(organization.purpose);
        this.name.setValue(organization.name);
        this.organization = organization;
        /*this.credential.partyId = organization.partyId;
        this.credential.username = organization.name; */
      }, error => {
        console.log(error);
      });

      this.partyService.getCompanyPhoto(this.partyId)
      .subscribe(imageStr => {
        this.backgroundImage= `url(${imageStr})`;
      },error => {
        console.log(error);
      });
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
        return authenticationService.isValidEditOrganizationName(that.partyId,value);
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
  }*/


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

  /*get currentPassword(): FormControl {
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
  } */

  get companyEditForm(): FormGroup {
    return this._companyEditForm;
  }

  set companyEditForm(value: FormGroup) {
    this._companyEditForm = value;
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  uploadPhoto() {
    this.partyService
    .updateCompanyPhoto(this.partyId, this.croppedImage)
    .subscribe(value => {
      if(value){
      this.backgroundImage = `url(${this.croppedImage})`;
      }else {
        console.log("error");
      }
    }, error => {
      console.log(error);
    });
  }

  /*updateCredential() {
    this.partyService
    .updateCredential(this.credential)
    .subscribe(value => {
      if (value) {
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

    /*if(this.newPassword.value){
      this.credential.password = this.newPassword.value;
    }*/
      this.partyService
      .updateOrganization(this.organization)
      .subscribe(value => {
        if (value) {
           this.router.navigate(['/parties/organizations/listing']);
           //this.updateCredential();
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

}
