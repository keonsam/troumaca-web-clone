import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthenticationComponent} from './authentication.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot.password.component';
import {authenticationServiceProvider} from './authenticate.service.provider';
import { AuthenticationRoutingModule } from './authentication.routing.module';
import {MaterialModule} from '../app/material.module';
import {authenticationRepositoryProvider} from '../adapter/authentication/authentication.repository.adapter.provider';
import {authenticationClientProvider} from '../client/credential/authentication.client.provider';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DialogModule} from '../dialog/dialog.module';
import {AccountTypeModalComponent} from './account-type-modal/account.type.modal.component';
import {SignUpModalComponent} from './sign-up-modal/sign.up.modal.component';
import {ConfirmationModalComponent} from './confirmation-modal/confirmation.modal.component';
import {PopUpModule} from '../pop-up/pop-up.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    DialogModule,
    PopUpModule
  ],
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AccountTypeModalComponent,
    SignUpModalComponent,
    ConfirmationModalComponent
  ],
  entryComponents: [
    AccountTypeModalComponent,
    SignUpModalComponent,
    ConfirmationModalComponent
  ],
  providers: [
    authenticationServiceProvider,
    authenticationRepositoryProvider,
    authenticationClientProvider
  ],
  exports: []
})
export class AuthenticationModule {}
