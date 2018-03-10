import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";

//import {Event} from "../event";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'phone.verification',
  templateUrl: './phone.verification.component.html',
  styleUrls: ['./phone.verification.component.css']
})
export class PhoneVerificationComponent implements OnInit {

  private _phoneVerificationForm: FormGroup;
  private sub: any;
  private _phoneErrorForm: FormGroup;
  private confirmationId: string;
  private phoneNumber: string;
  private _confirmationCode: FormControl;
  private _phoneNumber: FormControl;

  private _errorExists:boolean;
  private _sendPhoneForm: boolean;
  private textMessageSuccess: boolean;
  private textMessageFailure: boolean;

  constructor(//private eventService: EventService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {

    this.confirmationCode = new FormControl("", [Validators.required,
                                        Validators.minLength(6),
                                        Validators.maxLength(6)]);

    this.phoneNumber = new FormControl("", [Validators.required]);

     this.phoneVerificationForm = formBuilder.group({
      "confirmationCode": this.confirmationCode,
    });


    this.errorExists = false;
    this.sendPhoneForm = false;
    this.textMessageSuccess = false;
    this.textMessageFailure = false;
  }

  ngOnInit(): void {
    console.log(document.cookie);
    let credentialInformation = document.cookie.match(/credentialInformation=([^;]+)/).[1].match(/=(.+)/).[1];
    if(!credentialInformation) {
    this.route.params.subscribe(params => {
      this.credentialId = params["credentialId"];
      if(!this.credentialId) {
        this.sendPhoneForm = true;
      }
    });
    }else {
      credentialInformation = JSON.parse(credentialInformation);
      this.credentialId = credentialInformation.credentialId;
      this.phoneNumber = credentialInformation.phoneNumber;
    }
  }

  get errorExists(): boolean {
    return this._errorExists;
  }

  set errorExists(value: boolean) {
    this._errorExists = value;
  }

  get sendPhoneForm(): boolean {
    return this._sendPhoneForm;
  }

  set sendPhoneForm(value: boolean) {
    this._sendPhoneForm = value;
  }

  get confirmationCode(): FormControl {
    return this._confirmationCode;
  }

  set confirmationCode(value: FormControl) {
    this._confirmationCode = value;
  }

  get phoneNumber(): FormControl {
    return this._phoneNumber;
  }

  set phoneNumber(value : FormControl) {
    this._phoneNumber = value;
  }

  get phoneVerificationForm(): FormGroup {
    return this._phoneVerificationForm;
  }

  set phoneVerificationForm(value: FormGroup) {
    this._phoneVerificationForm = value;
  }

  get phoneErrorForm(): FormGroup {
    return this._phoneErrorForm;
  }

  set phoneErrorForm(value: FormGroup) {
    this._phoneErrorForm = value;
  }

  sendCode() {
    this.textMessageSuccess = false;
    this.textMessageFailure = false;

    this.authenticationService
    .sendPhoneCode(this.credentialInformation)
    .subscribe(next => {
      if(next) {
        this.textMessageSuccess = true;
        setTimeout(() => {
          this.textMessageSuccess = false;
        }, 1000 *10);
      } else {
        this.textMessageFailure = true;
        setTimeout(() => {
          this.sendPhoneForm = true;
        });
      }
    }, error =>{
      this.textMessageFailure = true;
      setTimeout(() => {
        this.sendPhoneForm = true;
      });
     }
    });
  }

  onSubmit() {
    this.errorExists = false;

    this.authenticationService
      .authenticateSMSCode(this.credentialId,this.confirmationCode.value)
      .subscribe(next => {
        if (next) {
          this.errorExists = false;
          this.router.navigate(['/authentication/login']);
        } else {
          this.errorExists = true;
        }
      }, error => {
        this.errorExists = true;
      });
  }

  onSubmitTwo() {
    this.errorExists = false;

    this.authenticationService
      .newPhoneUUID(this.phoneNumber.value)
      .subscribe(next => {
        if (next) {
          this.router.navigate([`/authentication/phone-verification/${next}`]);
        } else {
          this.errorExists = true;
        }
      }, error => {
        this.errorExists = true;
      });
  }

}
