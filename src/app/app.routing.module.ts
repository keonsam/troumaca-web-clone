import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page.not.found.component';
import {FrontHomeComponent} from '../front-home/front.home.component';
import { AuthGuard } from '../auth-guard/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: FrontHomeComponent, canActivate: [AuthGuard]},
  { path: 'authentication', loadChildren: '../authentication/authentication.module#AuthenticationModule'},
  { path: 'lobby', loadChildren: '../lobby/lobby.module#LobbyModule', canLoad: [AuthGuard]},
  { path: 'access-roles', loadChildren: '../access-roles/access.role.module#AccessRoleModule', canLoad: [AuthGuard] },
  { path: 'asset-type-classes', loadChildren: '../asset-type-classes/asset.type.class.module#AssetTypeClassModule', canLoad: [AuthGuard] },
  { path: 'asset-types', loadChildren: '../asset-types/asset.type.module#AssetTypesModule', canLoad: [AuthGuard] },
  { path: 'assets', loadChildren: '../assets/asset.module#AssetModule', canLoad: [AuthGuard] },
  { path: 'brands', loadChildren: '../brands/brand.module#BrandModule', canLoad: [AuthGuard] },
  { path: 'asset-characteristics',
    loadChildren: '../asset-characteristics/asset.characteristic.module#AssetCharacteristicModule', canLoad: [AuthGuard] },
  { path: 'asset-name-types', loadChildren: '../asset-name-types/asset.name.type.module#AssetNameTypeModule', canLoad: [AuthGuard] },
  { path: 'asset-identifier-types',
    loadChildren: '../asset-identifier-types/asset.identifier.type.module#AssetIdentifierTypeModule', canLoad: [AuthGuard] },
  { path: 'asset-role-types', loadChildren: '../asset-role-types/asset.role.type.module#AssetRoleTypeModule', canLoad: [AuthGuard] },
  { path: 'attributes', loadChildren: '../attributes/attribute.module#AttributeModule', canLoad: [AuthGuard] },
  { path: 'depreciation', loadChildren: '../depreciation/depreciation.module#DepreciationModule', canLoad: [AuthGuard] },
  { path: 'parties', loadChildren: '../parties/party.module#PartyModule', canLoad: [AuthGuard] },
  { path: 'sites', loadChildren: '../site/site.module#SiteModule', canLoad: [AuthGuard] },
  { path: 'organizations',
    loadChildren: '../organization-create/organization.create.module#OrganizationCreateModule'
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
