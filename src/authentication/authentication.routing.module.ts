import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthenticationComponent} from './authentication.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot.password.component';
import {RegisterComponent} from './register/register.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {AUTHENTICATION, CONFIRMATION, FORGOT_PASSWORD, REGISTER} from '../app/routes';
import { LOGIN } from '../app/routes';

export const routes: Routes = [
  { path: '', component: AuthenticationComponent, children: [
      { path: '', redirectTo: `/${AUTHENTICATION}/${LOGIN}`, pathMatch: 'full' },
      { path: LOGIN,  component: LoginComponent },
      { path: `${FORGOT_PASSWORD}/username`, component: ForgotPasswordComponent },
      { path: `${FORGOT_PASSWORD}/change/:credentialId/:code`, component: ForgotPasswordComponent },
      { path: REGISTER, component: RegisterComponent },
      { path: `${CONFIRMATION}/:credentialId/:confirmationId`, component: ConfirmationComponent},
      { path: `${FORGOT_PASSWORD}/${CONFIRMATION}/:credentialId/:confirmationId`, component: ConfirmationComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthenticationRoutingModule { }
