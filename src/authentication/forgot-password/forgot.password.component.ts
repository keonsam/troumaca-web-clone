import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {AuthenticationService} from '../authentication.service';
import {Credential} from '../credential';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidResponse} from '../valid.response';
import {ChangePassword} from '../change.password';
import {AUTHENTICATION, CONFIRMATION, FORGOT_PASSWORD, HOME, LOGIN} from '../../app/routes';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot.password.component.html',
  styleUrls: ['./forgot.password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  errorExists: boolean;
  username: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  usernameForm: FormGroup;
  passwordForm: FormGroup;
  message = '';
  formType2 = false;

  private credential: Credential;
  private changePassword: ChangePassword;
  private sub: any;
  homeLink = `/${HOME}`;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {

    this.credential = new Credential();
    this.changePassword = new ChangePassword();

    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [
      Validators.required,
      this.passwordValidator(this.authenticationService)
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      this.confirmEmailOrPhoneValidator(this.password)
    ]);

    this.usernameForm = formBuilder.group({
      'username': this.username,
    });

    this.passwordForm = formBuilder.group({
      'password': this.password,
      'confirmPassword': this.confirmPassword
    });


    this.usernameForm
      .valueChanges
      .subscribe(value => {
        this.credential.username = value.username;
      });

    this.passwordForm
      .valueChanges
      .subscribe(value => {
        this.changePassword.newPassword = value.password;
      });
  }

  ngOnInit(): void {
    if (this.router.url.indexOf('change') !== -1) {
      this.formType2 = true;
      this.sub = this.route.params.subscribe(params => {
        this.changePassword.credentialId = params['credentialId'];
        this.changePassword.code = params['code'];
      });
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
        value.subscribe( (otherValue: ValidResponse) => {
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

  private confirmEmailOrPhoneValidator(password: FormControl) {
    return (c: FormControl) => {
      return password.value === c.value ? null : {
        confirmPassword: true
      };
    };
  }

  onForgotPassword() {
    this.errorExists = false;
    this.authenticationService.forgotPassword(this.credential)
      .subscribe( value => {
        if (value && value.confirmationId) {
          this.router.navigate([`/${AUTHENTICATION}/${FORGOT_PASSWORD}/${CONFIRMATION}/${value.credentialId}/${value.confirmationId}`]);
        }else {
          this.message = 'Username does not exit, please try again.';
          this.errorExists = true;
        }
      }, error => {
        console.log(error);
        this.message = 'Username does not exit, please try again.';
        this.errorExists = true;
      });
  }

  onSubmit() {
    this.errorExists = false;

    this.authenticationService.changePassword(this.changePassword)
      .subscribe(changeRes => {
        if (changeRes && changeRes.changed) {
          this.router.navigate([`/${AUTHENTICATION}/${LOGIN}`]);
        } else {
          this.message = 'Password change failed.';
          this.errorExists = true;
        }
      }, error1 => {
        console.log(error1);
        this.message = 'Password change failed.';
        this.errorExists = true;
      });
  }

}
