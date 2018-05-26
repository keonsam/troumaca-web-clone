import {Component, OnInit} from "@angular/core";

//import {Event} from "../event";
import {CredentialConfirmation} from "../credential.confirmation";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";


@Component({
  selector: 'email.verification',
  templateUrl: './email.verification.component.html',
  styleUrls: ['./email.verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  private credentialConfirmation: CredentialConfirmation;

  private newUser: boolean;
  private errorExists: boolean;
  private emailMessageSuccess: boolean;
  private emailMessageFailure: boolean;
  private sendConfirmationCodeConfirmed: boolean;
  private verifiedPass: boolean;
  private verifiedFailed: boolean;
  private _message: string = "";

  constructor(//private eventService: EventService,
              private route: ActivatedRoute,
              //private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {

    this.credentialConfirmation = new CredentialConfirmation();

    this.verifiedPass = false;
    this.verifiedFailed = false;
    this.newUser = false;
    this.errorExists = false;
    this.emailMessageSuccess = false;
    this.emailMessageFailure = false;
  }

  ngOnInit(): void {
       this.route.params.subscribe(params => {
         this.credentialConfirmation.credentialConfirmationId = params["credentialConfirmationId"];
         this.route.queryParams.subscribe(queryParams =>{
           this.credentialConfirmation.confirmationCode = queryParams["confirmationCode"];

         if(this.credentialConfirmation.credentialConfirmationId && !this.credentialConfirmation.confirmationCode) {
           this.newUser = true;
         }else {
           this.authenticationService
           .verifyCredentialConfirmation(this.credentialConfirmation)
           .subscribe(next => {
             if(!next.fail || next.message === "Already Confirmed.") {
               this.message = next.message;
               this.verifiedPass = true;
               setTimeout(() => {
                 this.router.navigate(['/authentication/login']);
               }, 1000 * 5);
             } else {
               // display errors
               this.message = next.message;
               this.verifiedFailed = true;
             }
           }, error => {
             /// better error
               this.verifiedFailed = true;
           });
         };
       });
     });
  }


  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  sendConfirmationCode() {
    this.emailMessageSuccess = false;
    this.emailMessageFailure = false;

    this.authenticationService
    .sendConfirmationCode(this.credentialConfirmation.credentialConfirmationId, "email")
    .subscribe(next => {
        if(!next.fail) {
          this.message = next.message;
          if ( next.data.credentialConfirmationId != this.credentialConfirmation.credentialConfirmationId) {
            this.emailMessageFailure = true;
            setTimeout(()=> {
              this.router.navigate([`/authentication/email-verification/${next.data.credentialConfirmationId}`]);
            }, 1000 *5);
          }else {
            this.emailMessageSuccess = true;
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
            this.emailMessageFailure = true;
          }
        }
      }, error => {
        /// make better error for this
        this.emailMessageFailure = true;
      });
  }

}
