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
import {MaterialModule} from '../app/material.module';
import {authenticationRepositoryProvider} from '../adapter/authentication/authentication.repository.adapter.provider';
import {authenticationClientProvider} from '../client/credential/authentication.client.provider';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DialogModule} from '../dialog/dialog.module';
import {SignUpModalComponent} from './sign-up-modal/sign.up.modal.component';
import {AccountTypeComponent} from './sign-up-modal/account-type/account.type.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    DialogModule
  ],
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmationComponent,
    SignUpModalComponent,
    AccountTypeComponent
  ],
  entryComponents: [
    SignUpModalComponent
  ],
  providers: [
    authenticationServiceProvider,
    authenticationRepositoryProvider,
    authenticationClientProvider
  ],
  exports: []
})
export class AuthenticationModule {}
