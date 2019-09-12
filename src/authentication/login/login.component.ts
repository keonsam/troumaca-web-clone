import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { Credential } from '../credential';
import {DASHBOARD} from '../../app/routes';
import {MatDialog} from '@angular/material';
import {AccountTypeModalComponent} from '../account-type-modal/account.type.modal.component';
import {SignUpModalComponent} from '../sign-up-modal/sign.up.modal.component';
import {ForgetUsernameComponent} from '../forget-username/forget.username.component';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation.modal.component';
import {ForgetPasswordComponent} from '../forget-password/forget.password.component';
import {ForgetSavedComponent} from '../forget-saved/forget.saved.component';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

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
  hide = true;
  accountType: string;
  faGoogle = faGoogle;
  faExclamationTriangle = faExclamationTriangle;
  loading: boolean;

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {
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
    console.log(this.username);
  }

  onSubmit() {
    this.loading = true;
    this.doNotDisplayFailureMessage = true;
    this.authenticationService
      .authenticate(this.credential)
      .subscribe(auth => {
        this.loading = false;
        if (auth) {
          if (auth.state === 'USERNAME_NOT_CONFIRMED') {
            this.openConfirmation({...auth.confirmation, username: this.credential.username });
          } else {
            this.router.navigate([`/${DASHBOARD}`]);
          }
        }else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.loading = false;
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

    dialogRef.componentInstance.onNext.subscribe((result: any) => {
      if (result && result.confirmationId) {
        this.openConfirmation(result);
        dialogRef.close();
      }
    });
  }

  private openConfirmation(confirmation: any) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { ...confirmation},
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: false,
      disableClose: false,
      panelClass: ['modal', 'modal-white', 'modal-verify'],
    });

    dialogRef.componentInstance.onPrevious.subscribe((result: boolean) => {
      if (result) {
        this.openForget();
        dialogRef.close();
      }
    });
    dialogRef.componentInstance.onNext.subscribe((result: string) => {
      this.openPassword(result);
      dialogRef.close();
    });
  }

  private openPassword(result) {
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      data: {... result},
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: false,
      disableClose: true,
      panelClass: ['modal', 'modal-white'],
    });

    dialogRef.componentInstance.onNext.subscribe((res: boolean) => {
      if (res) {
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
