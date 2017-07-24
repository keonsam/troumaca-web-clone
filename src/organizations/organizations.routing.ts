import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {OrganizationsComponent} from "./organizations.component";
import {OrganizationComponent} from "./create-new/organization.component";
import {InviteComponent} from "./invite/invite.component";

export const organizationsRoutes: Routes = [
  {path: '', redirectTo: 'organizations', pathMatch: 'full'},
  {path: 'organizations', component: OrganizationsComponent},
  {path: 'organizations/create-new', component: OrganizationComponent},
  {path: 'organizations/invite', component: InviteComponent},
];

export const organizationsRouting: ModuleWithProviders = RouterModule.forChild(organizationsRoutes);