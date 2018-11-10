import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { Credential } from '../credential';
import {SessionService} from "../../session/session.service";

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
  errorExists: boolean;

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
    this.errorExists = false;

    this.authenticationService
      .authenticate(this.credential)
      .subscribe(authenticatedCredential => {
        if (authenticatedCredential && authenticatedCredential.authenticateStatus === 'AccountActive') {
          this.sessionService.loginEvent.next(true);
          this.router.navigate(['/lobby']);
        }else if (authenticatedCredential && authenticatedCredential.authenticateStatus === 'AccountConfirmed') {
          this.router.navigate(['/profile-organizations']);
        }else if (authenticatedCredential && authenticatedCredential.authenticateStatus === 'AccountUsernameNotConfirmed') {
          const credentialId = authenticatedCredential.credentialId;
          const confirmationId = authenticatedCredential.confirmationId;
          this.router.navigate([`/authentication/confirmations/${credentialId}/${confirmationId}`]);
        }else {
          console.log(authenticatedCredential);
          this.errorExists = true;
        }
      }, error => {
        console.log(error);
        this.errorExists = true;
      });
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

}
