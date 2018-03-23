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
  private _password: FormControl;
  private _confirmPassword: FormControl;

  private _userMeForm: FormGroup;

  private user: User;
  private credential: Credential;

  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private backgroundImage: any = '';

  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage2: boolean;
  private requiredState: boolean = false;
  private defaultImage: string;

  constructor(private partyEventService:PartyEventService,
              private partyService: PartyService,
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

     this.defaultImage = "url(http://i0.wp.com/www.xcelerationfit.com/wp-content/plugins/elementor/assets/images/placeholder.png?w=825)";


     this.doNotDisplayFailureMessage = true;
     this.doNotDisplayFailureMessage2 = true;
  }

  ngOnInit(): void {
    let that = this;
    // this need fixing
    this.userMeForm.get("password").valueChanges
    .subscribe(value => {
      if(value.length === 1 && !this.requiredState){
      this.requiredState = true;
      this.userMeForm.get("password").setValidators([Validators.required, this.passwordValidator(this.partyService)]);
      this.userMeForm.get("confirmPassword").setValidators([Validators.required, this.confirmPasswordValidator(this.password)]);
    }else if (!value) {
      this.requiredState = false;
      this.userMeForm.get("password").setValidators(null);
      this.userMeForm.get("confirmPassword").setValidators(null);
    }
    this.userMeForm.updateValueAndValidity();
    });
       this.partyId = "c079cf94-2db5-4048-a5de-db7d8c3e1351";
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

      this.partyService.getPhoto(this.partyId)
      .subscribe(imageStr => {
        if(imageStr) {
          this.backgroundImage= `url(${imageStr})`;
        }else {
          // default image moved to the front end
          this.backgroundImage= this.defaultImage;
        }
      },error => {
        console.log(error);
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
    if(this.backgroundImage === this.defaultImage) {
      this.partyService
      .addPhoto(this.partyId, this.croppedImage)
      .subscribe(value => {
        if(value){
        this.backgroundImage = `url(${this.croppedImage})`;
        }else {
          console.log("error");
        }
      }, error => {
        console.log(error);
      });
    }else {
      this.partyService
      .updatePhoto(this.partyId, this.croppedImage)
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
      .updateUser(this.user)
      .subscribe(value => {
        if (value) {
           this.updateCredential();
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

}
