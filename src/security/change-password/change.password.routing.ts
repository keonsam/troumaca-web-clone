import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ChangePasswordComponent} from './change.password.component';

export const changePasswordRoutes: Routes = [
  {path: '', redirectTo: 'change-password', pathMatch: 'full'},
  {path: 'change-password', component: ChangePasswordComponent}
];

export const changePasswordRouting: ModuleWithProviders = RouterModule.forChild(changePasswordRoutes);
