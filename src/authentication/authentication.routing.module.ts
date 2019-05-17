import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthenticationComponent} from './authentication.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AUTHENTICATION, REGISTER} from '../app/routes';
import { LOGIN } from '../app/routes';

export const routes: Routes = [
  { path: '', component: AuthenticationComponent, children: [
      { path: '', redirectTo: `/${AUTHENTICATION}/${LOGIN}`, pathMatch: 'full' },
      { path: LOGIN,  component: LoginComponent },
      { path: `${REGISTER}/:account/:username`, component: RegisterComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthenticationRoutingModule { }
