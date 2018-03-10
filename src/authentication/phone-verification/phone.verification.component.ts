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
  private _phoneErrorForm: FormGroup;
  private credentialConformationId: string;
  private _smsCode: FormControl;
  // What is the phone number used for in this view?
  private _phoneNumber: FormControl;

  private _errorExists:boolean;
  private _unknownLink: boolean;

  constructor(//private eventService: EventService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {

    this.smsCode = new FormControl("", [Validators.required,
                                        Validators.minLength(6),
                                        Validators.maxLength(6)]);

    this.phoneNumber = new FormControl("", [Validators.required]);

     this.phoneVerificationForm = formBuilder.group({
      "smsCode": this.smsCode
    });

    this.phoneErrorForm = formBuilder.group({
      "phoneNumber": this.phoneNumber
    });

    this.errorExists = false;
    this.unknownLink = false;
  }

  ngOnInit(): void {
    let that = this;

    this.route.params.subscribe(params => {
      this.credentialConformationId = params["credentialConformationId"];

      if(!this.credentialConformationId) {
        this.unknownLink = true;

        // What was this for?
        // setTimeout(() => {
        //   this.router.navigate(['/authentication/register']);
        // }, 60 * 5 * 1000); //one minute for testing purposes
      }
    });
  }

  get errorExists(): boolean {
    return this._errorExists;
  }

  set errorExists(value: boolean) {
    this._errorExists = value;
  }

  get unknownLink(): boolean {
    return this._unknownLink;
  }

  set unknownLink(value: boolean) {
    this._unknownLink = value;
  }

  get smsCode(): FormControl {
    return this._smsCode;
  }

  set smsCode(value: FormControl) {
    this._smsCode = value;
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

  // Todo: Fix this
  sendCode() {
    this.authenticationService
    .sendPhoneCode(this.credentialConformationId)
    .subscribe(next => {
      if(next) {
        // We don't want to do this.
        document.getElementById("openModalButton").click();
      } else {
        // display errors
      }
    }, error =>{
      // display errors
    });
  }

  onSubmit() {
    this.errorExists = false;

    this.authenticationService
      .authenticateSMSCode(this.credentialConformationId, this.smsCode.value)
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

  // Todo: Fix this
  onSubmitTwo() {
    this.errorExists = false;

    this.authenticationService
      .newPhoneUUID(this.phoneNumber.value)
      .subscribe(next => {
        if (next) {
          this.errorExists = false;
          this.router.navigate([`/authentication/phone-verification/${next}`]);
        } else {
          this.errorExists = true;
        }
      }, error => {
        this.errorExists = true;
      });
  }

}
