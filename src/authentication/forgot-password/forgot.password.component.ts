import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {of } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
import {AuthenticationService} from '../authentication.service';
import {Credential} from "../credential";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot.password.component.html',
  styleUrls: ['./forgot.password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  errorExists: boolean;
  username: FormControl;
  forgotPasswordForm: FormGroup;
  private credential: Credential;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.username = new FormControl('', [Validators.required]);
    this.forgotPasswordForm = formBuilder.group({
      'username': this.username,
    });

    this.forgotPasswordForm
      .valueChanges
      .subscribe( value => {
        this.credential.username = value.username;
      });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorExists = false;
    this.authenticationService.forgotPassword(this.credential)
      .subscribe( value => {
        if (value && value.confirmationId) {
          this.router.navigate([`/authentication/confirmations/${value.credentialId}/${value.confirmationId}`]);
        }else {
          this.errorExists = true;
        }
      }, error => {
        this.errorExists = true;
      });
  }
}
