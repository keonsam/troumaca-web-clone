import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {PartyService} from '../party.service';
import {User} from '../user';
import {Organization} from '../organization';
import {Photo} from '../photo';
import {EventService} from '../../event/event.service';
import {Event} from '../../authentication/event';

@Component({
  selector: 'create-profile',
  templateUrl: './create.profile.component.html',
  styleUrls: ['./create.profile.component.css']
})
export class CreateAccountComponent implements OnInit {

  private _firstName: FormControl;
  private _middleName: FormControl;
  private _lastName: FormControl;
  private _purpose: FormControl;
  private _organizationName: FormControl;
  private _description: FormControl;

  private _createProfileForm: FormGroup;

  private _user: User;
  private _organization: Organization;
  private photo: Photo;
  private photo2: Photo;
  private partyId: string;
  private _imageChangedEvent: any = '';
  public croppedImage: any = '';
  private _userImage: any;
  private _imageChangedEvent2: any = '';
  public croppedImage2: any = '';
  private _organizationImage: any;

  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage2: boolean;
  private _doNotDisplayFailureMessage3: boolean;
  private userImageComplete = false;
  public userExist: boolean = false;

  constructor(private partyService: PartyService,
              private eventService: EventService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.firstName = new FormControl('', [Validators.required]);
    this.middleName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.purpose = new FormControl('');
    this.organizationName = new FormControl('');
    this.description = new FormControl('');

    this.createProfileForm = formBuilder.group({
      'firstName': this.firstName,
      'middleName': this.middleName,
      'lastName': this.lastName,
      'purpose': this.purpose,
      'organizationName': this.organizationName,
      'description': this.description
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

    this.userImage = 'https://designdroide.com/images/abstract-user-icon-4.svg';
    this.organizationImage = 'url(https://i.pinimg.com/736x/05/19/3c/05193c43ed8e4a9ba4dfaa10ff0115f1.jpg)';

    this.doNotDisplayFailureMessage = true;
     this.doNotDisplayFailureMessage2 = true;
     this.doNotDisplayFailureMessage3 = true;
  }

  ngOnInit(): void {
    this.partyService.getPartyId()
      .subscribe( partyId => {
        if (!partyId) {
          // TODO: throw error here partyId should exist
          this.router.navigate(['/home']);
        } else {
          this.partyService.getUser(partyId)
            .subscribe(userRes => {
              this.firstName.setValue(userRes.user.firstName);
              this.middleName.setValue(userRes.user.middleName);
              this.lastName.setValue(userRes.user.lastName);
              this.userExist = true;
            });
        }
      });
  }

  createEventModel() {
    const event: Event = new Event();
    event.partyId = '123';
    event.timestamp = new Date().getTime();
    event.source = 'create.profile.component';
    event.name = 'login';

    return event;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get organization(): Organization {
    return this._organization;
  }

  set organization(value: Organization) {
    this._organization = value;
  }

  get imageChangedEvent(): any {
    return this._imageChangedEvent;
  }

  set imageChangedEvent(value: any) {
    this._imageChangedEvent = value;
  }

  get userImage(): any {
    return this._userImage;
  }

  set userImage(value: any) {
    this._userImage = value;
  }

  get imageChangedEvent2(): any {
    return this._imageChangedEvent2;
  }

  set imageChangedEvent2(value: any) {
    this._imageChangedEvent2 = value;
  }

  get organizationImage(): any {
    return this._organizationImage;
  }

  set organizationImage(value: any) {
    this._organizationImage = value;
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
   this.partyService.addPhoto(this.photo2, 'organization')
     .subscribe(value => {
       if (value.partyId) {
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
      this.partyService.addPhoto(this.photo, 'user')
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
      .addAccount( this.user , this.organization)
      .subscribe(value => {
        if (value.created) {
          this.partyId = value.user.partyId;
          if (this.photo.imageStr || this.photo2.imageStr) {
            this.savePhoto();
          }else {
            this.eventService.sendLoginEvent(this.createEventModel());
            this.router.navigate(['/home/lobby']);
          }
        } else {
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
    this.doNotDisplayFailureMessage3 = true;
    if (this.partyId) {
      this.savePhoto();
    }else {
      this.addAccount();
    }
  }

}
