import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {OrganizationComponent} from "./organization.component";


const organizationRoutes: Routes = [
  {path: '', redirectTo: 'create-new', pathMatch: 'full'},
  {path: 'create-new', component: OrganizationComponent},
];

export const organizationRouting: ModuleWithProviders = RouterModule.forChild(organizationRoutes);