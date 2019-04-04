import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { Credential } from '../credential';
import {SessionService} from '../../session/session.service';
import {AUTHENTICATION, CONFIRMATION, FORGOT_PASSWORD, HOME, LOBBY, ORGANIZATION} from '../../app/routes';

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
  forgotPasswordRoute = `/${AUTHENTICATION}/${FORGOT_PASSWORD}/username`;
  homeLink = `/${HOME}`;

  constructor(private formBuilder: FormBuilder,
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
          console.log(authenticatedCredential);
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

}
