import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthenticationComponent} from './authentication.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot.password.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {authenticationServiceProvider} from './authenticate.service.provider';
import { AuthenticationRoutingModule } from './authentication.routing.module';
import {MaterialModule} from "../app/material.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MaterialModule
  ],
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmationComponent,
  ],
  providers: [authenticationServiceProvider],
  exports: []
})
export class AuthenticationModule {}
