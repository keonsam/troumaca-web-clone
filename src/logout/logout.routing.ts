import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LogoutComponent} from './logout.component';


const logoutRoutes: Routes = [
  {path: 'logout', component: LogoutComponent},
];

export const logoutRouting: ModuleWithProviders = RouterModule.forChild(logoutRoutes);
