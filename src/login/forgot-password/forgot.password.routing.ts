import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {ForgotPasswordComponent} from "./forgot.password.component";


export const forgotPasswordRoutes: Routes = [
  {path: 'forgot-password', component: ForgotPasswordComponent},
];

export const forgotPasswordRouting: ModuleWithProviders = RouterModule.forChild(forgotPasswordRoutes);