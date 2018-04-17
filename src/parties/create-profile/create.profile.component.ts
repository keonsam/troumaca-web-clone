import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {PartyService} from "../party.service";
import {User} from "../user";
import {Organization} from "../organization";
import {EventName} from "../../event/event.name";
import {EventService} from "../../event/event.service";
import {Event} from "../../authentication/event";

@Component({
  selector: 'create-profile',
  templateUrl:'./create.profile.component.html',
  styleUrls: ['./create.profile.component.css']
})
export class CreateAccountComponent implements OnInit {

  private _accountType: FormControl;
  private _firstName: FormControl;
  private _middleName: FormControl;
  private _lastName: FormControl;
  private _purpose: FormControl;
  private _organizationName: FormControl;
  private _description: FormControl;

  private _createProfileForm: FormGroup;

  private user: User;
  private organization: Organization;

  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private userImage: any = '';
  private imageChangedEvent2: any = '';
  private croppedImage2: any = '';
  private organizationImage: any = '';

  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage2: boolean;
  private requiredState: boolean = false;

  constructor(private partyService: PartyService,
              private eventService: EventService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.accountType = new FormControl("", [Validators.required]);
    this.firstName = new FormControl("", [Validators.required]);
    this.middleName = new FormControl("", [Validators.required]);
    this.lastName = new FormControl("", [Validators.required]);
    this.purpose = new FormControl("", [Validators.required]);
    this.organizationName = new FormControl("", [Validators.required]);
    this.description = new FormControl("");

    this.createProfileForm = formBuilder.group({
      "accountType": this.accountType,
      "firstName": this.firstName,
      "middleName": this.middleName,
      "lastName": this.lastName,
      "purpose": this.purpose,
      "organizationName": this.organizationName,
      "description": this.description
    });

    this.user = new User();
    this.organization = new Organization();

    this.createProfileForm
     .valueChanges
     .subscribe(value => {
       this.user.firstName = value.firstName;
       this.user.middleName = value.middleName;
       this.user.lastName = value.lastName;
       this.organization.purpose = value.purpose;
       this.organization.name = value.organizationName;
       this.organization.description = value.description;
       console.log(this.createProfileForm);
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
     this.doNotDisplayFailureMessage2 = true;
  }

  ngOnInit(): void {
    this.userImage= `url(http://i0.wp.com/www.xcelerationfit.com/wp-content/plugins/elementor/assets/images/placeholder.png?w=825)`;

    this.createProfileForm.get("accountType")
    .valueChanges
    .subscribe(type => {
      console.log(type);
      if(type === "personal" || ""){
        this.userImage= `url(http://i0.wp.com/www.xcelerationfit.com/wp-content/plugins/elementor/assets/images/placeholder.png?w=825)`;
        this.requiredState = false;
        this.createProfileForm.get("organizationName").setValidators(null);
        this.createProfileForm.get("purpose").setValidators(null);
        this.createProfileForm.get("organizationName").updateValueAndValidity();
        this.createProfileForm.get("purpose").updateValueAndValidity();
      }else {
        this.userImage = `http://i0.wp.com/www.xcelerationfit.com/wp-content/plugins/elementor/assets/images/placeholder.png?w=825)`;
        this.requiredState = true;
        this.createProfileForm.get("organizationName").setValidators([Validators.required]);
        this.createProfileForm.get("purpose").setValidators([Validators.required]);
        this.createProfileForm.get("organizationName").updateValueAndValidity();
        this.createProfileForm.get("purpose").updateValueAndValidity();
      }
      this.createProfileForm.updateValueAndValidity();
    });
  }

  createEventModel() {
    let event:Event = new Event();
    event.partyId = "123";
    event.timestamp = new Date().getTime();
    event.source = "create.profile.component";
    event.name = "login";

    return event;
  }

  get accountType(): FormControl {
    return this._accountType;
  }

  set accountType(value: FormControl) {
    this._accountType = value;
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

  get purpose(): FormControl {
    return this._purpose;
  }

  set purpose(value: FormControl) {
    this._purpose = value;
  }

  get organizationName(): FormControl {
    return this._organizationName;
  }

  set organizationName(value: FormControl) {
    this._organizationName = value;
  }

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
  }

  get createProfileForm(): FormGroup {
    return this._createProfileForm;
  }

  set createProfileForm(value: FormGroup) {
    this._createProfileForm = value;
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
    if(this.accountType.value === "personal") {
      this.userImage = `url(${this.croppedImage})`;
    }else {
      this.userImage = this.croppedImage;
    }
  }

  imageLoaded() {
    //console.log("imageLoaded");
  }

  loadImageFailed() {
    //console.log("loadImageFailed");
  }

  fileChangeEvent2(event: any): void {
    this.imageChangedEvent2 = event;
  }

  imageCropped2(image: string) {
    this.croppedImage2 = image;
    this.organizationImage = `url(${this.croppedImage2})`;
  }

  imageLoaded2() {
    //console.log("imageLoaded");
  }

  loadImageFailed2() {
    //console.log("loadImageFailed");
  }

  savePhoto(partyId) {
    this.partyService
    .addPhoto(partyId, this.croppedImage)
    .subscribe(value => {
      this.eventService.sendEvent(EventName.LOGIN, this.createEventModel());
      this.router.navigate(['/home/lobby']);
    }, error => {
      console.log(error);
    });
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;
     // changed to avoid errors one called to the serve
    this.partyService
      .addAccount(this.accountType.value, this.user ,this.organization)
      .subscribe(value => {
        if(value.created){
          if(this.croppedImage){
            this.savePhoto(value.user.partyId);
          }else {
            this.eventService.sendEvent(EventName.LOGIN, this.createEventModel());
            this.router.navigate(['/home/lobby']);
          }
        }else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });

  }

}
