import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Credential} from '../credential';
import {ActivatedRoute, Router} from '@angular/router';
import { ValidResponse } from '../valid.response';
import {debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import {User} from '../../parties/user';
import {AUTHENTICATION, CONFIRMATION, HOME, LOGIN} from '../../app/routes';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation.modal.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  // firstName: FormControl;
  // lastName: FormControl;
  companyName: FormControl;
  username: FormControl;
  password: FormControl;
  confirmPass: FormControl;
  private credential: Credential;
  private user: User;
  doNotDisplayFailureMessage: boolean;
  homeLink = `/${HOME}`;
  loginRoute = `/${AUTHENTICATION}/${LOGIN}`;
  secondImg = false;
  email = false;
  error: string;

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

    // this.firstName = new FormControl( '', [Validators.required]);
    //
    // this.lastName = new FormControl( '', [Validators.required]);

    this.password = new FormControl('', [
      Validators.required,
      this.passwordValidator(this.authenticationService)
    ]);

    this.confirmPass = new FormControl( '', [Validators.required, this.checkPasswords.bind(this)]);


    this.registrationForm = formBuilder.group({
      'username': this.username,
      'companyName': this.companyName,
      // 'firstName': this.firstName,
      // 'lastName': this.lastName,
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
        // this.user.firstName = value.firstName;
        // this.user.lastName = value.lastName;
      });

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    if (localStorage.getItem('verification')) {
      this.openConfirmation();
    }
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
        value.subscribe( (otherValue: boolean) => {
          isValidUsername = otherValue;
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
        value.subscribe( (otherValue: boolean) => {
          isValidPassword = otherValue;
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
    this.authenticationService
    .addCredential(this.credential)
    .subscribe(confirmation => {
      if (confirmation && confirmation.confirmationId) {
        localStorage.setItem('verification', JSON.stringify({
          usernameType: this.credential.usernameType,
          username: this.credential.username,
          credentialId: confirmation.credentialId,
          confirmationId: confirmation.confirmationId
        }));
        this.openConfirmation();
        // this.router.navigate([`/${AUTHENTICATION}/${CONFIRMATION}/${confirmation.credentialId}/${confirmation.confirmationId}`]);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
    });
  }

  openConfirmation() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: false,
      disableClose: true,
      panelClass: ['modal', 'modal-verify'],
    });

    // dialogRef.componentInstance.onNext.subscribe((result: string) => {
    //   this.openSignUp()
    // });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  hideError(event: boolean) {
    if (event) {
      this.doNotDisplayFailureMessage = true;
    }
  }

}
