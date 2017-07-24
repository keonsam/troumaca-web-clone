import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from "./login.component";


const loginRoutes: Routes = [
  {path: 'login', component: LoginComponent},
];

export const loginRouting: ModuleWithProviders = RouterModule.forChild(loginRoutes);