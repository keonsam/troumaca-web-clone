import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {PartyService} from "../party.service";
import {Account} from "../account";

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

  private account: Account;

  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private backgroundImage: any = '';

  private _doNotDisplayFailureMessage: boolean;
  private requiredState: boolean;

  constructor(private partyService: PartyService,
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

    this.account = new Account();

    this.createProfileForm
     .valueChanges
     .subscribe(value => {
       this.requiredState = value.accountType == 'personal' ? false: true;
       this.account.accountType = value.accountType;
       this.account.firstName = value.firstName;
       this.account.middleName = value.middleName;
       this.account.lastName = value.lastName;
       this.account.purpose = value.purpose;
       this.account.organizationName = value.organizationName;
       this.account.description = value.description;
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
     this.requiredState = false;
  }

  ngOnInit(): void {
    this.backgroundImage= `url(http://i0.wp.com/www.xcelerationfit.com/wp-content/plugins/elementor/assets/images/placeholder.png?w=825)`;
  }

  validateOrganizationName(accountType: FormControl) {
    return (c:FormControl) => {
      console.log(c);
      if(accountType.value == "personal") {
        return null;
      }else {
        return c.value.length >= 1 ? null : {
          validateEmail: {
            valid: false
          }
        };
      };
    };
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
    this.backgroundImage = `url(${this.croppedImage})`;
  }

  savePhoto(partyId) {
    this.partyService
    .addAccountPhoto(partyId, this.croppedImage)
    .subscribe(value => {
      //Leave this optional for now.
      // errors
    }, error => {
      console.log(error);
    });
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

      this.partyService
      .createAccount(this.account)
      .subscribe(value => {
        if (value && value.partyId) {
          if(this.croppedImage){
            this.savePhoto(value.partyId);
          }
           this.router.navigate(['/home/lobby']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

}
