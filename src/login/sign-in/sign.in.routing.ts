import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {SignInComponent} from "./sign.in.component";


export const signInRoutes: Routes = [
  {path: 'sign-in', component: SignInComponent}

];

export const signInRouting: ModuleWithProviders = RouterModule.forChild(signInRoutes);