import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthenticationComponent} from './authentication.component';
import {ForgotPasswordComponent} from './forgot-password/forgot.password.component';
import {LoginComponent} from './login/login.component';


const authenticationRoutes: Routes = [
  { path: 'authentication', component: AuthenticationComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login',  component: LoginComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent}
  ]}

];

export const authenticationRouting: ModuleWithProviders = RouterModule.forChild(authenticationRoutes);
