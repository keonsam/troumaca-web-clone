import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page.not.found.component';
import {FrontHomeComponent} from '../front-home/front.home.component';
import { AuthGuard } from '../auth-guard/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: FrontHomeComponent, canActivate: [AuthGuard]},
  { path: 'authentication', loadChildren: '../authentication/authentication.module#AuthenticationModule', canActivate: [AuthGuard]},
  { path: 'lobby', loadChildren: '../lobby/lobby.module#LobbyModule', canLoad: [AuthGuard]},
  { path: 'access-roles', loadChildren: '../access-roles/access.role.module#AccessRoleModule', canLoad: [AuthGuard] },
  { path: 'asset-type-classes', loadChildren: '../asset-type-classes/asset.type.class.module#AssetTypeClassModule', canLoad: [AuthGuard] },
  { path: 'asset-types', loadChildren: '../asset-types/asset.type.module#AssetTypesModule', canLoad: [AuthGuard] },
  { path: 'assets', loadChildren: '../assets/asset.module#AssetModule', canLoad: [AuthGuard] },
  { path: 'attributes', loadChildren: '../attributes/attribute.module#AttributeModule', canLoad: [AuthGuard] },
  { path: 'depreciation', loadChildren: '../depreciation/depreciation.module#DepreciationModule', canLoad: [AuthGuard] },
  { path: 'parties', loadChildren: '../parties/party.module#PartyModule', canLoad: [AuthGuard] },
  { path: 'sites', loadChildren: '../site/site.module#SiteModule', canLoad: [AuthGuard] },
  { path: 'profile-organizations',
    loadChildren: '../parties/organizations/create-organization/create.organization.module#CreateOrganizationModule',
    canLoad: [AuthGuard]
  },
  { path: 'billing-details', loadChildren: '../billing-details/billing-details.module#BillingDetailsModule', canLoad: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent, data : { displayMenu: false } },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
