import {Routes, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";
import {AuthenticationComponent} from "./authentication.component";
import {LoginComponent} from "./login/login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot.password.component";
import {RegisterComponent} from "./register/register.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";

export const routes: Routes = [
  { path: '', component: AuthenticationComponent, children: [
      { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
      { path: 'login',  component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'register', component: RegisterComponent },
      {path: 'confirmations/:credentialId/:confirmationId', component: ConfirmationComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthenticationRoutingModule { }
