import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SignUpComponent} from './sign.up.component';


const signUpRoutes: Routes = [
  {path: 'sign-up', component: SignUpComponent},
];

export const signUpRouting: ModuleWithProviders = RouterModule.forChild(signUpRoutes);
