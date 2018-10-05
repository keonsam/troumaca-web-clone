import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page.not.found.component';
import {FrontHomeComponent} from '../front-home/front.home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: FrontHomeComponent},
  { path: 'lobby', loadChildren: '../lobby/lobby.module#LobbyModule'},
  { path: 'access-roles', loadChildren: '../access-roles/access.role.module#AccessRoleModule' },
  { path: 'asset-type-classes', loadChildren: '../asset-type-classes/asset.type.class.module#AssetTypeClassModule' },
  { path: 'asset-types', loadChildren: '../asset-types/asset.type.module#AssetTypesModule' },
  { path: 'assets', loadChildren: '../assets/asset.module#AssetModule' },
  { path: 'attributes', loadChildren: '../attributes/attribute.module#AttributeModule' },
  { path: 'authentication', loadChildren: '../authentication/authentication.module#AuthenticationModule' },
  { path: 'depreciation', loadChildren: '../depreciation/depreciation.module#DepreciationModule' },
  { path: 'parties', loadChildren: '../parties/party.module#PartyModule' },
  { path: 'sites', loadChildren: '../site/site.module#SiteModule' },
  { path: 'profile-organizations',
    loadChildren: '../parties/organizations/create-organization/create.organization.module#CreateOrganizationModule'},
  { path: 'billing-details', loadChildren: '../billing-details/billing-details.module#BillingDetailsModule'},
  { path: '**', component: PageNotFoundComponent },
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
