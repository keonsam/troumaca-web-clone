import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

//import {Event} from "../event";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";


@Component({
  selector: 'email.verification',
  templateUrl: './email.verification.component.html',
  styleUrls: ['./email.verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  private sub:any;
  private verifiedPass: boolean;
  private verifiedFailed: boolean;
  private newUser: boolean;
  private credentialId: string;
  private emailCode: string;
  private _errorExists: boolean;
  private _emailAddress: FormControl;
  private _emailAddressForm: FormGroup;
  private showEmailAddressForm: boolean;
  private emailMessageSuccess: boolean;
  private emailMessageFailure: boolean;

  constructor(//private eventService: EventService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {

    this.emailAddress = new FormControl("", [Validators.required]);

    this.emailAddressForm = formBuilder.group({
      "emailAddress": this.emailAddress
    });

    this.verifiedPass = false;
    this.verifiedFailed = false;
    this.newUser = false;
    this.errorExists = false;
    this.emailMessageSuccess = false;
    this.emailMessageFailure = false;
  }

  ngOnInit(): void {
       this.sub = this.route.params.subscribe(params => {

         this.credentialId = params["credentialId"];

         if(!this.credentialId) {
           this.newUser = true;
         }

         if(this.credentialId){
         this.authenticationService
         .authenticateEmailCode(this.credentialId)
         .subscribe(next => {
           if(next) {
             this.verifiedPass = true;
             setTimeout(() => {
               this.router.navigate(['/authentication/login']);
             }, 1000 * 10);
           }else {
             // display errors
             this.verifiedFailed = true;
             setTimeout(() => {
               this.router.navigate(['/authentication/login']);
             }, 1000 * 60);
           }
         }, error => {
             this.verifiedFailed = true;
             setTimeout(() => {
               this.router.navigate(['/authentication/login']);
             }, 1000 * 60);

         });
       }
   });
  }

  get errorExists(): boolean {
    return this._errorExists;
  }

  set errorExists(value: boolean) {
    this._errorExists = value;
  }

  get emailAddress(): FormControl {
    return this._emailAddress;
  }

  set emailAddress(value: FormControl) {
    this._emailAddress = value;
  }

  get emailAddressForm(): FormGroup {
    return this._emailAddressForm;
  }

  set emailAddressForm(value: FormGroup) {
    this._emailAddressForm = value;
  }

  switchCode() {
    this.newUser = false;
    this.unknownLink = true;
  }

  sendEmailCode() {
    this.emailMessageSuccess = false;
    this.emailMessageFailure = false;
    this.authenticationService
    .sendEmailCode(this.credentialId)
    .subscribe(next => {
      if(next) {
        this.emailMessageSuccess = true;
        setTimeout(()=> {
         this.emailMessageSuccess = false;
        }, 1000 * 10)
      }else {
        // display Error
        this.emailMessageFailure = true;
      }
    }, error => {
      this.emailMessageFailure = true;
      // display Error
    });
  }

  onSubmit() {
    this.errorExists = false;
    this.authenticationService
    .newEmailUUID(this.emailAddress.value)
    .subscribe(next => {
      if(next){
        this.errorExists = false;
        this.router.navigate([`/authentication/email-verification/${next}`]);
      }else{
        this.errorExists = true;
      }
    }, error => {
      this.errorExists = true;
    });
  }
}
