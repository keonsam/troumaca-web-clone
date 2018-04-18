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
import {EventService} from "../../../event/event.service";
import {Event} from "../../../authentication/event";

@Component({
  selector: 'user-me',
  templateUrl:'./user.me.component.html',
  styleUrls: ['./user.me.component.css']
})
export class UserMeComponent implements OnInit {

  private partyId: string;
  private _firstName: FormControl;
  private _middleName: FormControl;
  private _lastName: FormControl;
  private _username: FormControl;
  private _password: FormControl;
  private _confirmPassword: FormControl;

  private _userMeForm: FormGroup;

  private user: User;
  private credential: Credential;

  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private backgroundImage: any = '';
  private updateImage: boolean = false;

  private _doNotDisplayFailureMessage: boolean;
  private requiredState: boolean = false;

  constructor(private partyEventService:PartyEventService,
              private partyService: PartyService,
              private eventService: EventService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.user = new User();
    this.credential = new Credential();

    this.firstName = new FormControl("", [Validators.required]);
    this.middleName = new FormControl("", [Validators.required]);
    this.lastName = new FormControl("", [Validators.required]);
    this.username = new FormControl("", [Validators.required, this.usernameEditValidator(this.partyService)]);
    this.password = new FormControl("");
    this.confirmPassword = new FormControl("");

    this.userMeForm = formBuilder.group({
      "firstName": this.firstName,
      "middleName": this.middleName,
      "lastName": this.lastName,
      "username": this.username,
      "password": this.password,
      "confirmPassword": this.confirmPassword
    });

    this.userMeForm
     .valueChanges
     .subscribe(value => {
       this.user.firstName = value.firstName;
       this.user.middleName = value.middleName;
       this.user.lastName = value.lastName;
       this.user.username = value.username;
       this.credential.username = value.username;
       this.credential.password = value.password;
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    this.backgroundImage = "http://i0.wp.com/www.xcelerationfit.com/wp-content/plugins/elementor/assets/images/placeholder.png?w=825";

    this.userMeForm.get("password").valueChanges
    .subscribe(value => {
      if(value.length === 1 && !this.requiredState){
      this.requiredState = true;
      this.userMeForm.get("password").setValidators([Validators.required, this.passwordValidator(this.partyService)]);
      this.userMeForm.get("confirmPassword").setValidators([Validators.required, this.confirmPasswordValidator(this.password)]);
      this.userMeForm.get("confirmPassword").updateValueAndValidity();
      }else if (!value) {
      this.requiredState = false;
      this.userMeForm.get("password").setValidators(null);
      this.userMeForm.get("confirmPassword").setValidators(null);
      this.userMeForm.get("confirmPassword").updateValueAndValidity();
    }
    this.userMeForm.updateValueAndValidity();
    });

       this.partyService.getPartyId()
         .subscribe((partyId: string) => {
           this.partyId = partyId;
           this.partyService.getUser(this.partyId)
             .subscribe(user =>{
               this.firstName.setValue(user.firstName);
               this.middleName.setValue(user.middleName);
               this.lastName.setValue(user.lastName);
               this.username.setValue(user.username);
               this.user = user;
               this.partyId = user.partyId;
               this.credential.partyId = user.partyId;
               this.credential.username = user.username;
             }, error => {
               console.log(error);
             });

           this.partyService.getPhoto(this.partyId, "user")
             .subscribe(imageStr => {
               if(imageStr) {
                 this.updateImage = true;
                 this.backgroundImage = imageStr;
               }
             },error => {
               console.log(error);
             });
         });
  }

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

  passwordValidator(partyService:PartyService) {
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
        return partyService.isValidPassword(value);
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

  confirmPasswordValidator(password:FormControl) {
    return (c:FormControl) => {
      return password.value == c.value ? null : {
        validateEmail: {
          valid: false
        }
      };
    };
  }

  createEventModel() {
    let event:Event = new Event();
    event.partyId = this.partyId
    event.timestamp = new Date().getTime();
    event.source = "user.me.component";
    event.name = "image change";

    return event;
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

  get password(): FormControl {
    return this._password;
  }

  set password(value: FormControl) {
    this._password = value;
  }

  get confirmPassword(): FormControl {
    return this._confirmPassword;
  }

  set confirmPassword(value: FormControl) {
    this._confirmPassword = value;
  }

  get userMeForm(): FormGroup {
    return this._userMeForm;
  }

  set userMeForm(value: FormGroup) {
    this._userMeForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  getBackgroundImage() {
    if(this.croppedImage && this.croppedImage !== this.backgroundImage) {
      return `url(${this.croppedImage})`;
    }
    return `url(${this.backgroundImage})`;
  }

  pictureModalClose() {
    this.croppedImage = this.backgroundImage;
  }

  uploadPhoto() {
    // New and better algorithm
    if(this.updateImage && this.croppedImage !== this.backgroundImage) {
      this.partyService
        .updatePhoto(this.partyId, this.croppedImage, "user")
        .subscribe(value => {
          if(value){
            this.backgroundImage = this.croppedImage;
            this.eventService.sendPhotoChangeEvent(this.createEventModel());
          }else {
            console.log("error");
          }
        }, error => {
          console.log(error);
        });
    }else if(this.croppedImage) {
      this.partyService
        .addPhoto(this.partyId, this.croppedImage, "user")
        .subscribe(value => {
          if(value){
            this.backgroundImage = this.croppedImage;
            this.eventService.sendPhotoChangeEvent(this.createEventModel());
          }else {
            // TODO: make errors fail to upload picture or something like that.
            console.log("error");
          }
        }, error => {
          console.log(error);
        });
    }else {
      console.log("image not uploaded");
    }
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

      this.partyService
      .updateUserMe(this.user, this.credential)
      .subscribe(value => {
        if (value) {
          this.router.navigate(['/parties/users']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

}
