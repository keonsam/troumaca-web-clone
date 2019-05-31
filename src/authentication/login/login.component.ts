import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { Credential } from '../credential';
import {SessionService} from '../../session/session.service';
import {AUTHENTICATION, CONFIRMATION, LOBBY, ORGANIZATION} from '../../app/routes';
import {MatDialog} from '@angular/material';
import {AccountTypeModalComponent} from '../account-type-modal/account.type.modal.component';
import {SignUpModalComponent} from '../sign-up-modal/sign.up.modal.component';
import {ForgetUsernameComponent} from '../forget-username/forget.username.component';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation.modal.component';
import {ForgetPasswordComponent} from '../forget-password/forget.password.component';
import {ForgetSavedComponent} from '../forget-saved/forget.saved.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  rememberMe: FormControl;
  private credential: Credential;
  doNotDisplayFailureMessage = true;
  error= 'Failed to Login';
  // forgotPasswordRoute = `/${AUTHENTICATION}/${FORGOT_PASSWORD}/username`;
  // homeLink = `/${HOME}`;
  hide = true;
  accountType: string;

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private sessionService: SessionService) {
    this.credential = new Credential();

    this.username = new FormControl('', [
      Validators.required
    ]);

    this.password = new FormControl('', [
      Validators.required
    ]);

    this.rememberMe = new FormControl('');

    this.loginForm = formBuilder.group({
      'username': this.username,
      'password': this.password,
      'rememberMe': this.rememberMe
    });

    this.loginForm
      .valueChanges
      .subscribe( value => {
        this.credential.username = value.username;
        this.credential.password = value.password;
        this.credential.rememberMe = value.rememberMe;
      });

  }

  ngOnInit(): void {
    if (localStorage.getItem('verification')) {
      this.openConfirmation();
    }
  }

  onSubmit() {
    this.doNotDisplayFailureMessage = true;
    this.authenticationService
      .authenticate(this.credential)
      .subscribe(authenticatedCredential => {
        if (authenticatedCredential && authenticatedCredential.authenticateStatus === 'CredentialActive') {
          this.sessionService.loginEvent.next(true);
          this.router.navigate([`/${LOBBY}`]);
        }else if (authenticatedCredential && authenticatedCredential.authenticateStatus === 'CredentialConfirmed') {
          this.router.navigate([`/${ORGANIZATION}/create`]);
        }else if (authenticatedCredential && authenticatedCredential.authenticateStatus === 'CredentialUsernameNotConfirmed') {
          const credentialId = authenticatedCredential.credentialId;
          const confirmationId = authenticatedCredential.confirmationId;
          this.router.navigate([`/${AUTHENTICATION}/${CONFIRMATION}/${credentialId}/${confirmationId}`]);
        }else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  openAccountType() {
    const dialogRef = this.dialog.open(AccountTypeModalComponent, {
      data: { accountType: this.accountType},
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: false,
      disableClose: true,
      panelClass: 'modal',
    });

    dialogRef.componentInstance.onNext.subscribe((result: string) => {
      this.accountType = result;
      this.openSignUp();
      dialogRef.close();
    });
  }

  private openSignUp() {
    const dialogRef = this.dialog.open(SignUpModalComponent, {
      data: { accountType: this.accountType},
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: false,
      disableClose: true,
      panelClass: 'modal',
    });

    dialogRef.componentInstance.onNext.subscribe((result: string) => {
      // this.openConfirmation();
      dialogRef.close();
    });

    dialogRef.componentInstance.onPrevious.subscribe( (result: string) => {
      this.openAccountType();
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  hideError(event: boolean) {
    if (event) {
      this.doNotDisplayFailureMessage = true;
    }
  }

  openForget() {
    const dialogRef = this.dialog.open(ForgetUsernameComponent, {
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: false,
      disableClose: false,
      panelClass: ['modal', 'modal-white'],
    });

    dialogRef.componentInstance.onNext.subscribe((result: boolean) => {
      if (result) {
        this.openConfirmation();
        dialogRef.close();
      }
    });
  }

  private openConfirmation() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: false,
      disableClose: true,
      panelClass: ['modal', 'modal-white', 'modal-verify'],
    });

    dialogRef.componentInstance.onPrevious.subscribe((result: boolean) => {
      if (result) {
        this.openForget();
        dialogRef.close();
      }
    });
    dialogRef.componentInstance.onNext.subscribe((result: string) => {
      this.openPassword();
      dialogRef.close();
    });
  }

  private openPassword() {
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: false,
      disableClose: true,
      panelClass: ['modal', 'modal-white'],
    });

    dialogRef.componentInstance.onNext.subscribe((result: string) => {
      if (result) {
        this.openSaved();
        dialogRef.close();
      }
    });
  }

  private openSaved() {
    this.dialog.open(ForgetSavedComponent, {
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: false,
      disableClose: false,
      panelClass: ['modal', 'modal-white'],
    });
  }
}
