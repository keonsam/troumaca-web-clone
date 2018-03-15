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
  private verifiedFailed: boolean

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
             if(next.status == 'CONFIRMED') {
               this.verifiedPass = true;
               setTimeout(() => {
                 this.router.navigate(['/authentication/login']);
               }, 1000 * 10);
             }else {
               // display errors
               this.verifiedFailed = true;
             }
           }, error => {
             /// better errors
               this.verifiedFailed = true;
           });
         };
       });
     });
  }

  sendConfirmationCode() {
    this.emailMessageSuccess = false;
    this.emailMessageFailure = false;

    this.authenticationService
    .sendConfirmationCode(this.credentialConfirmation.credentialConfirmationId, "email")
    .subscribe(next => {
      if(next) {
        if (next.status == 'CONFIRMED') {
          this.sendConfirmationCodeConfirmed = true;
          setTimeout(()=> {
            this.router.navigate(['/authentication/login']);
          }, 1000 *10);
        }else if (next.status == 'NEW' && next.credentialConfirmationId != this.credentialConfirmation.credentialConfirmationId) {
          this.emailMessageFailure = true;
        }else {
          this.emailMessageSuccess = true;
          setTimeout(()=> {
            this.emailMessageSuccess = false;
          }, 5000);
        }
      }
    }, error =>{
      // add better error message
      this.emailMessageFailure = true;
    });
  }

}
