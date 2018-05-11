import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";

//import {Event} from "../event";
import {CredentialConfirmation} from "../credential.confirmation";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'phone.verification',
  templateUrl: './phone.verification.component.html',
  styleUrls: ['./phone.verification.component.css']
})
export class PhoneVerificationComponent implements OnInit {

  private _phoneVerificationForm: FormGroup;
  private _confirmationCode: FormControl;

  private credentialConfirmation : CredentialConfirmation;

  private errorExists:boolean;
  private textMessageSuccess: boolean;
  private textMessageFailure: boolean;
  private textMessageFailure2: boolean;
  private sendConfirmationCodeConfirmed: boolean;
  private noEntry: boolean;
  private _message: string = "";

  constructor(//private eventService: EventService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {

    this.confirmationCode = new FormControl("", [Validators.required,
                                        Validators.minLength(6),
                                        Validators.maxLength(6)]);

     this.phoneVerificationForm = formBuilder.group({
      "confirmationCode": this.confirmationCode,
    });

    this.phoneVerificationForm
    .valueChanges
    .subscribe(value => {
      this.credentialConfirmation.confirmationCode = value.confirmationCode;


    }, error2 => {
      console.log(error2);
    });

    this.credentialConfirmation = new CredentialConfirmation();


    this.errorExists = false;
    this.textMessageSuccess = false;
    this.textMessageFailure = false;
    this.sendConfirmationCodeConfirmed = false;
    this.noEntry = false;
    this.textMessageFailure2 = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.credentialConfirmation.credentialConfirmationId = params["credentialConfirmationId"];
    });
  }

  get confirmationCode(): FormControl {
    return this._confirmationCode;
  }

  set confirmationCode(value: FormControl) {
    this._confirmationCode = value;
  }

  get phoneVerificationForm(): FormGroup {
    return this._phoneVerificationForm;
  }

  set phoneVerificationForm(value: FormGroup) {
    this._phoneVerificationForm = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

// Todo: Fix this
  sendConfirmationCode() {
    this.textMessageSuccess = false;
    this.textMessageFailure = false;
    this.textMessageFailure2 = false;
    this.errorExists = false;
    this.noEntry = false;

    this.authenticationService
    .sendConfirmationCode(this.credentialConfirmation.credentialConfirmationId, "phone")
    .subscribe(next => {
      if(!next.fail) {
        this.message = next.message;
        if ( next.data.credentialConfirmationId != this.credentialConfirmation.credentialConfirmationId) {
          this.textMessageFailure = true;
          setTimeout(()=> {
            this.router.navigate([`/authentication/phone-verification/${next.data.credentialConfirmationId}`]);
          }, 1000 *5);
        }else {
          this.textMessageSuccess = true;
          setTimeout(()=> {
            this.textMessageSuccess = false;
          }, 5000);
        }
      }else {
        if (next.data.credentialStatus == 'CONFIRMED') {
          this.message = next.message;
          this.sendConfirmationCodeConfirmed = true;
          setTimeout(() => {
            this.router.navigate(['/authentication/login']);
          }, 1000 * 5);
        } else {
          this.message = next.message;
          this.noEntry = true;
        }
      }
      }, error => {
      console.log(error)

      /// make better error for this
      this.noEntry = true;
    });
  }

  onSubmit() {
    this.errorExists = false;
    this.textMessageFailure2 = false;

    this.authenticationService
      .verifyCredentialConfirmation(this.credentialConfirmation)
      .subscribe(next => {
        if(!next.fail) {
          this.router.navigate(['/authentication/login']);
        }else {
          if(next.data.credentialStatus === 'CONFIRMED') {
            this.message = next.message;
          } else  if(next.data.credentialStatus === 'EXPIRED') {
            this.message = next.message;
            this.textMessageFailure2 = true;
          }else {
            this.message = next.message;
            this.errorExists = true;
          }
        }
      }, error => {
        this.errorExists = true;
      });
  }

}
