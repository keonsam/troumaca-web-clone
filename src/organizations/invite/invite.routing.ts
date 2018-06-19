import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {InviteComponent} from './invite.component';


const inviteRoutes: Routes = [
  {path: '', redirectTo: 'create-new', pathMatch: 'full'},
  {path: 'create-new', component: InviteComponent},
];

export const inviteRouting: ModuleWithProviders = RouterModule.forChild(inviteRoutes);
