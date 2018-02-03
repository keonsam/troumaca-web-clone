import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AccountComponent} from "./account.component";
// import {organizationsRoutes} from "../organizations/organizations.routing";
// import {personsRoutes} from "../persons/persons.routing";
// import {securityRoutes} from "../security/security.routing";
import {AuthGuard} from "../auth-guard/auth.guard";

// , children: organizationsRoutes.concat(personsRoutes).concat(securityRoutes)}
// canActivateChild: [AuthGuard]
const accountRoutes: Routes = [
  {path: 'account', canActivate: [AuthGuard], component: AccountComponent}
];

export const accountRouting: ModuleWithProviders = RouterModule.forChild(accountRoutes);