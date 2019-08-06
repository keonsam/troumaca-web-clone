import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Credential} from '../credential';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import {User} from '../../parties/user';
import {AUTHENTICATION, HOME, LOGIN} from '../../app/routes';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation.modal.component';
import {MatDialog} from '@angular/material';
import {IsValid} from '../isValid';
import {Confirmation} from '../confirmation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  companyName: FormControl;
  username: FormControl;
  password: FormControl;
  confirmPass: FormControl;
  private credential: Credential;
  private user: User;
  doNotDisplayFailureMessage: boolean;
  loginRoute = `/${AUTHENTICATION}/${LOGIN}`;
  secondImg = false;
  email = false;
  error: string;
  loading: boolean;

  constructor(public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.credential = new Credential();
    this.route.params.subscribe( params => {
      this.credential.accountType = params.account;
      this.credential.usernameType = params.username;
      if (params.account === 'corporate') {
        this.secondImg = true;
      }
      if (params.username === 'email') {
        this.email = true;
      }
    });
    this.user = new User();

    this.username = new FormControl('', [
      Validators.required,
      this.usernameValidator(authenticationService)
    ]);

    if (this.secondImg) {
      this.companyName = new FormControl( '', [Validators.required]);
    } else {
      this.companyName = new FormControl( '');
    }

    this.firstName = new FormControl( '', [Validators.required]);

    this.lastName = new FormControl( '', [Validators.required]);

    this.password = new FormControl('', [
      Validators.required,
      this.passwordValidator(this.authenticationService)
    ]);

    this.confirmPass = new FormControl( '', [Validators.required, this.checkPasswords.bind(this)]);


    this.registrationForm = formBuilder.group({
      'companyName': this.companyName,
      'firstName': this.firstName,
      'lastName': this.lastName,
      'username': this.username,
      'password': this.password,
      'confirmPass': this.confirmPass
    });

    this.registrationForm
      .valueChanges
      .subscribe(value => {
        this.credential.username = value.username;
        this.credential.companyName = value.companyName;
        this.credential.password = value.password;
        this.credential.confirmedPassword = value.confirmPass;
        this.user.firstName = value.firstName;
        this.user.lastName = value.lastName;
      });

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
  }

  private usernameValidator(authenticationService: AuthenticationService) {
    let usernameControl = null;
    let isValidUsername = false;
    let valueChanges = null;

    const subscriberToChangeEvents = function () {
      valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged(),  filter(value => { // filter out empty values
        return !!(value);
      }), map((value: string) => {
        return authenticationService.isValidUsername(value);
      })).subscribe(value => {
        value.subscribe( (otherValue: IsValid) => {
          isValidUsername = otherValue.valid;
          usernameControl.updateValueAndValidity();
        });
      });
    };

    return (control: FormControl) => {
       if (!usernameControl) {
         usernameControl = control;
       }

       if (!valueChanges && control.valueChanges) {
         valueChanges = control.valueChanges;
         subscriberToChangeEvents();
       }

      return isValidUsername ? null : {
        validateEmail: true
      };
    }
  }

  private passwordValidator(authenticationService: AuthenticationService) {
    let passwordControl = null;
    let isValidPassword = false;
    let valueChanges = null;

    const subscriberToChangeEvents = function () {
      valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), filter(value => { // filter out empty values
        return !!(value);
      }), map((value: string) => {
        return authenticationService.isValidPassword(value);
      })).subscribe(value => {
        value.subscribe( (otherValue: IsValid) => {
          isValidPassword = otherValue.valid;
          passwordControl.updateValueAndValidity();
        });
      });
    };

    return (control: FormControl) => {
      if (!passwordControl) {
        passwordControl = control;
      }

      if (!valueChanges && control.valueChanges) {
        valueChanges = control.valueChanges;
        subscriberToChangeEvents();
      }

      return isValidPassword ? null : {
        password: true
      };
    }
  }

  private checkPasswords(group: FormGroup) {
    const pass = this.password.value;
    const confirmPass = group.value;

    return pass === confirmPass ? null : { password: true }
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.loading = true;
    this.authenticationService
    .addCredential(this.user, this.credential)
    .subscribe(confirmation => {
      this.loading = false;
      if (confirmation && confirmation.confirmationId) {
        this.openConfirmation(confirmation);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
        console.log(error);
      this.loading = false;
      this.doNotDisplayFailureMessage = false;
    });
  }

  openConfirmation(confirmation: Confirmation) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { ...confirmation, username: this.credential.username},
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: false,
      disableClose: true,
      panelClass: ['modal', 'modal-verify'],
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  hideError(event: boolean) {
    if (event) {
      this.doNotDisplayFailureMessage = true;
    }
  }

}
