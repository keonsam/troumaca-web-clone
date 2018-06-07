import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {PartyService} from "../party.service";
import {User} from "../user";
import {Organization} from "../organization";
import {Photo} from "../photo";
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
  private photo: Photo;
  private photo2: Photo;
  private partyId: string;
  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private userImage: any = '';
  private imageChangedEvent2: any = '';
  private croppedImage2: any = '';
  private organizationImage: any = '';

  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage2: boolean;
  private _doNotDisplayFailureMessage3: boolean;
  private userImageComplete: boolean = false;
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
    this.photo = new Photo();
    this.photo2 = new Photo();

    this.createProfileForm
     .valueChanges
     .subscribe(value => {
       this.user.firstName = value.firstName;
       this.user.middleName = value.middleName;
       this.user.lastName = value.lastName;
       this.organization.purpose = value.purpose;
       this.organization.name = value.organizationName;
       this.organization.description = value.description;
     }, error2 => {
       console.log(error2);
     });

    this.userImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqeFAYIE3hTj9Gs1j3v7o-oBadM5uDkuPBuXMPtXS85LufL7UVA';
    this.organizationImage = 'url(http://backgroundcheckall.com/wp-content/uploads/2017/12/windows-7-default-background-4.jpg)';

    this.doNotDisplayFailureMessage = true;
     this.doNotDisplayFailureMessage2 = true;
     this.doNotDisplayFailureMessage3 = true;
  }

  ngOnInit(): void {

    this.createProfileForm.get("accountType")
    .valueChanges
    .subscribe(type => {
      if(type === "personal" || ""){
        this.requiredState = false;
        this.createProfileForm.get("organizationName").setValidators(null);
        this.createProfileForm.get("purpose").setValidators(null);
        this.createProfileForm.get("organizationName").updateValueAndValidity();
        this.createProfileForm.get("purpose").updateValueAndValidity();
      }else {
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

  get doNotDisplayFailureMessage3(): boolean {
    return this._doNotDisplayFailureMessage3;
  }

  set doNotDisplayFailureMessage3(value: boolean) {
    this._doNotDisplayFailureMessage3 = value;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  fileChangeEvent2(event: any): void {
    this.imageChangedEvent2 = event;
  }

  imageCropped2(image: string) {
    this.croppedImage2 = image;
  }

  loginUserIn() {
    this.eventService.sendLoginEvent(this.createEventModel());
    this.router.navigate(['/home/lobby']);
  }

  addImage() {
    this.userImage = this.croppedImage;
    this.photo.imageStr = this.croppedImage;
  }

  addImage2() {
    this.organizationImage = `url(${this.croppedImage2})`;
    this.photo2.imageStr = this.croppedImage2;
  }

  addOrganizationPhoto() {
    this.photo2.partyId = this.partyId;
   this.partyService.addPhoto(this.partyId, this.photo2, 'organization')
     .subscribe(value => {
       if(value.partyId) {
         this.loginUserIn();
       }else {
         this.doNotDisplayFailureMessage3 = false;
       }
     }, error => {
       console.log(error);
       this.doNotDisplayFailureMessage3 = false;
     });
  }

  savePhoto() {
    if (this.photo.imageStr && !this.userImageComplete) {
      this.photo.partyId = this.partyId;
      this.partyService.addPhoto(this.partyId, this.photo, 'user')
        .subscribe(value => {
          if (value.partyId) {
            this.userImageComplete = true;
            if (this.photo2.imageStr) {
              this.addOrganizationPhoto();
            } else {
              this.loginUserIn();
            }
          } else {
            this.doNotDisplayFailureMessage2 = false;
          }
        }, error => {
          console.log(error);
          this.doNotDisplayFailureMessage2 = false;
        });
    } else {
      this.addOrganizationPhoto();
    }
  }

  addAccount() {
    this.partyService
      .addAccount(this.accountType.value, this.user ,this.organization)
      .subscribe(value => {
        if(value.created){
          this.partyId = value.user.partyId;
          if(this.photo.imageStr || this.photo2.imageStr){
            this.savePhoto();
          }else {
            this.eventService.sendLoginEvent(this.createEventModel());
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

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.doNotDisplayFailureMessage2 = true;
    if(this.partyId) {
      this.savePhoto();
    }else {
      this.addAccount();
    }
  }

}
