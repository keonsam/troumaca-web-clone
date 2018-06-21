import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthenticationComponent} from './authentication.component';
import {AuthenticationService} from './authentication.service';
import {AuthenticationRepository} from './authentication.repository';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot.password.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {LockComponent} from './lock/lock.component';
import {authenticationServiceProvider} from './authenticate.service.provider';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    AuthenticationComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmationComponent,
    LockComponent
  ],
  providers: [authenticationServiceProvider],
  exports: [
    LoginComponent,
    AuthenticationComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmationComponent,
    LockComponent
  ]
})
export class AuthenticationModule {}
