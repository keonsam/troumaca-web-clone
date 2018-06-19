import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SecurityComponent} from './security.component';
import {SessionComponent} from './session/session.component';
import {ChangePasswordComponent} from './change-password/change.password.component';

export const securityRoutes: Routes = [
  {path: '', redirectTo: 'security', pathMatch: 'full'},
  {path: 'security', component: SecurityComponent},
  {path: 'security/change-password', component: ChangePasswordComponent},
  {path: 'security/sessions', component: SessionComponent}
];

export const securityRouting: ModuleWithProviders = RouterModule.forChild(securityRoutes);
