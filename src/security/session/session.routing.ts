import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SessionComponent} from './session.component';

export const sessionRoutes: Routes = [
  {path: '', redirectTo: 'sessions', pathMatch: 'full'},
  {path: 'sessions', component: SessionComponent}
];

export const sessionRouting: ModuleWithProviders = RouterModule.forChild(sessionRoutes);
