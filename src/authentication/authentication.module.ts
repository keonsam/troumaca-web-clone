import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthenticationComponent} from './authentication.component';
import {RegisterComponent} from './register/register.component';
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
import {ForgetUsernameComponent} from './forget-username/forget.username.component';
import {ForgetPasswordComponent} from './forget-password/forget.password.component';
import {ForgetSavedComponent} from './forget-saved/forget.saved.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
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
    AccountTypeModalComponent,
    SignUpModalComponent,
    ConfirmationModalComponent,
    ForgetUsernameComponent,
    ForgetPasswordComponent,
    ForgetSavedComponent
  ],
  entryComponents: [
    AccountTypeModalComponent,
    SignUpModalComponent,
    ConfirmationModalComponent,
    ForgetUsernameComponent,
    ForgetPasswordComponent,
    ForgetSavedComponent
  ],
  providers: [
    authenticationServiceProvider,
    authenticationRepositoryProvider,
    authenticationClientProvider
  ],
  exports: []
})
export class AuthenticationModule {}
