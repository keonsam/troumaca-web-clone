import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AccountComponent} from "./account.component";
import {organizationsRoutes} from "../organizations/organizations.routing";
import {personsRoutes} from "../person/persons.routing";
import {securityRoutes} from "../security/security.routing";
import {AuthGuard} from "../auth-guard/auth.guard";

const accountRoutes: Routes = [
  {path: 'account', canActivate: [AuthGuard], canActivateChild: [AuthGuard], component: AccountComponent, children: organizationsRoutes.concat(personsRoutes).concat(securityRoutes)}
];

export const accountRouting: ModuleWithProviders = RouterModule.forChild(accountRoutes);