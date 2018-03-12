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
      if(next) {
        if (next.status == 'CONFIRMED') {
          this.sendConfirmationCodeConfirmed = true;
          setTimeout(()=> {
            this.router.navigate(['/authentication/login']);
          }, 1000 *5);
        }else if (next.status == 'NEW' && next.credentialConfirmationId != this.credentialConfirmation.credentialConfirmationId) {
          this.textMessageFailure = true;
          setTimeout(()=> {
            this.router.navigate([`/authentication/phone-verification/${next.credentialConfirmationId}`]);
          }, 1000 *5);
        }else {
          this.textMessageSuccess = true;
          setTimeout(()=> {
            this.textMessageSuccess = false;
          }, 5000);
        }
      }else {
        this.noEntry = true;
      }
    }, error =>{
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
        if (next.status == 'CONFIRMED') {
          this.router.navigate(['/authentication/login']);
        } else if(next.status == 'EXPIRED'){
          this.textMessageFailure2 = true;
        } else {
          this.errorExists = true;
        }
      }, error => {
        this.errorExists = true;
      });
  }

}
