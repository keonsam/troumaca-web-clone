import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

//import {Event} from "../event";
import {CredentialConfirmation} from '../credential.confirmation';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  private _phoneVerificationForm: FormGroup;
  private _confirmationCode: FormControl;

  private credentialConfirmation: CredentialConfirmation;

  private _confirmationSuccessful: boolean;
  private _sessionExpired: boolean;
  private _errorExists: boolean;
  private _textMessageSuccess: boolean;
  private _noEntry: boolean;
  private _message = '';
  private sub: any;
  private _username: string;

  constructor(//private eventService: EventService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {

    this.confirmationCode = new FormControl('', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)]);

    this.phoneVerificationForm = formBuilder.group({
      'confirmationCode': this.confirmationCode,
    });

    this.phoneVerificationForm
      .valueChanges
      .subscribe(value => {
        this.credentialConfirmation.confirmationCode = value.confirmationCode;
      }, error2 => {
        console.log(error2);
      });

    this.credentialConfirmation = new CredentialConfirmation();

    this.confirmationSuccessful = false;
    this.sessionExpired = false;
    this.errorExists = false;
    this.textMessageSuccess = false;
    this.noEntry = false;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const credentialConfirmationId = params['credentialConfirmationId'];
      this.credentialConfirmation.credentialConfirmationId = credentialConfirmationId;
      this.authenticationService.getConfirmationsUsername(credentialConfirmationId)
        .subscribe(username => {
          this.username = username
        }, error => {
          console.log(error);
        });
    });
  }

  get confirmationSuccessful(): boolean {
    return this._confirmationSuccessful;
  }

  set confirmationSuccessful(value: boolean) {
    this._confirmationSuccessful = value;
  }

  get sessionExpired(): boolean {
    return this._sessionExpired;
  }

  set sessionExpired(value: boolean) {
    this._sessionExpired = value;
  }

  get errorExists(): boolean {
    return this._errorExists;
  }

  set errorExists(value: boolean) {
    this._errorExists = value;
  }

  get textMessageSuccess(): boolean {
    return this._textMessageSuccess;
  }

  set textMessageSuccess(value: boolean) {
    this._textMessageSuccess = value;
  }

  get noEntry(): boolean {
    return this._noEntry;
  }

  set noEntry(value: boolean) {
    this._noEntry = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
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

  sendConfirmationCode() {
    this.textMessageSuccess = false;
    this.sessionExpired = false;
    this.errorExists = false;
    this.noEntry = false;

    this.confirmationSuccessful = false;
    this.sessionExpired = false;
    this.errorExists = false;

    //TODO: remove phone from the service call

    this.authenticationService
      .sendConfirmationCode(this.credentialConfirmation.credentialConfirmationId)
      .subscribe(next => {
        if (next.data.credentialStatus === 'CONFIRMED') {
          this.confirmationSuccessful = true;
          setTimeout(() => {
            this.router.navigate(['/authentication/login']);
          }, 2000);
        }else if (!next.fail && next.data.credentialConfirmationId === this.credentialConfirmation.credentialConfirmationId) {
          this.textMessageSuccess = true;
          setTimeout(() => {
            this.textMessageSuccess = false;
          }, 5000);
        }else if (!next.fail && next.data.credentialConfirmationId !== this.credentialConfirmation.credentialConfirmationId) {
          this.sessionExpired = true;
          setTimeout(() => {
            this.router.navigate([`/authentication/confirmations/${next.data.credentialConfirmationId}`]);
          }, 2000);
        }else {
          this.noEntry = true;
        }
      }, error => {
        console.log(error);
        /// make better error for this
        this.noEntry = true;
      });
  }

  onSubmit() {
    this.confirmationSuccessful = false;
    this.sessionExpired = false;
    this.errorExists = false;

    this.textMessageSuccess = false;
    this.sessionExpired = false;
    this.errorExists = false;
    this.noEntry = false;

    this.authenticationService
      .verifyCredentialConfirmation(this.credentialConfirmation)
      .subscribe(next => {
        if (next.data.credentialStatus === 'NEW') {
          this.sessionExpired = true;
          setTimeout(() => {
            this.router.navigate([`/authentication/confirmations/${next.data.credentialConfirmationId}`]);
          }, 2000);
        }else if (!next.fail || next.data.credentialStatus === 'CONFIRMED') {
          this.confirmationSuccessful = true;
          setTimeout(() => {
            this.router.navigate(['/authentication/login']);
          }, 2000);
        }else {
          this.errorExists = true;
        }
      }, error => {
        console.log(error);
        this.errorExists = true;
      });
  }

}
