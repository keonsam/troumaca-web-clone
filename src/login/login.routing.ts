import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from "./login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot.password.component";
import {SignInComponent} from "./sign-in/sign.in.component";


const loginRoutes: Routes = [
  {path: 'login', component: LoginComponent,
    children: [
      {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
      {path: 'sign-in',  component: SignInComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent}
    ]
  }

];

export const loginRouting: ModuleWithProviders = RouterModule.forChild(loginRoutes);