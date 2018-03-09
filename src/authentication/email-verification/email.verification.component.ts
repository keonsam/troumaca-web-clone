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
  private emailUUID: string;
  private emailCode: string;
  private unknownLink: boolean;
  private _errorExists: boolean;
  private _emailAddress: FormControl;
  private _emailAddressForm: FormGroup;
  private displaySuccessMessage: boolean;
  private sendCodeFailed: boolean;
  private showEmailCodeForm: boolean;

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
    this.unknownLink = false;
    this.errorExists = false;
    this.displaySuccessMessage = false;
    this.sendCodeFailed = false;
    this.showEmailCodeForm = false;
  }

  ngOnInit(): void {
       this.sub = this.route.params.subscribe(params => {
         this.route.queryParams.subscribe(params2 =>{
           this.emailUUID = params["emailUUID"];
           this.emailCode = params2["emailCode"];
           if(!this.emailUUID) {
             this.unknownLink = true;
             setTimeout(() => {
               this.router.navigate(['/authentication/register']);
             }, 1000 * 60);
           }

           if(this.emailUUID && !this.emailCode) {
             this.newUser = true;
           }

           if(this.emailUUID && this.emailCode){
           this.authenticationService
           .authenticateEmailCode(this.emailUUID, this.emailCode)
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
                 this.router.navigate(['/authentication/register']);
               }, 1000 * 60);
             }
           }, error => {
               this.verifiedFailed = true;
               setTimeout(() => {
                 this.router.navigate(['/authentication/register']);
               }, 1000 * 60);
             // display errors
           });
         }
       });
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

  showForm() {
    this.showEmailCodeForm = true;
  }

  sendEmailCode() {
    this.sendCodeFailed = false;
    this.displaySuccessMessage = false;
    this.authenticationService
    .sendEmailCode(this.emailUUID)
    .subscribe(next => {
      if(next) {
        this.displaySuccessMessage = true;
        setTimeout(()=> {
         this.displaySuccessMessage = false;
        }, 1000 * 10)
      }else {
        // display Error
        this.sendCodeFailed = true;
      }
    }, error => {
      this.sendCodeFailed = true;
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
