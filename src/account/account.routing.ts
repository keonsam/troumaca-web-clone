import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AccountComponent} from "./account.component";
import {organizationsRoutes} from "../organizations/organizations.routing";

// {path: 'account', component: AccountComponent, children:organizationsRoutes}

const accountRoutes: Routes = [
  {path: '', redirectTo: 'account', pathMatch: 'full'},
  {path: 'account', component: AccountComponent, children:organizationsRoutes}
];

export const accountRouting: ModuleWithProviders = RouterModule.forChild(accountRoutes);