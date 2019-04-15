import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page.not.found.component';
import {FrontHomeComponent} from '../front-home/front.home.component';
import { AuthGuard } from '../auth-guard/auth.guard';
import {
  ASSET,
  ASSET_CHARACTERISTICS,
  ASSET_SETTING,
  ASSET_TYPE,
  AUTHENTICATION,
  BILLING_DETAIL,
  HOME,
  LOBBY,
  ORGANIZATION, PEOPLE, USER
} from './routes';

const appRoutes: Routes = [
  { path: '', redirectTo: HOME, pathMatch: 'full'},
  { path: HOME, component: FrontHomeComponent },
  { path: AUTHENTICATION, loadChildren: '../authentication/authentication.module#AuthenticationModule'},
  { path: LOBBY, loadChildren: '../lobby/lobby.module#LobbyModule', canLoad: [AuthGuard]},
  { path: ASSET, loadChildren: '../assets/asset.module#AssetModule', canLoad: [AuthGuard] },
  { path: ASSET_TYPE, loadChildren: '../asset-types/asset.type.module#AssetTypesModule', canLoad: [AuthGuard] },
  {
    path: ASSET_CHARACTERISTICS,
    loadChildren: '../asset-characteristics/asset.characteristic.module#AssetCharacteristicModule', canLoad: [AuthGuard]
  },
  { path: ASSET_SETTING, loadChildren: '../asset-settings/asset.setting.module#AssetSettingModule', canLoad: [AuthGuard] },
  { path: ORGANIZATION,
    loadChildren: '../parties/organizations/organization.module#OrganizationModule',
    canLoad: [AuthGuard]
  },
  { path: USER,
    loadChildren: '../parties/users/user.module#UserModule',
    canLoad: [AuthGuard]
  },
  { path: PEOPLE,
    loadChildren: '../parties/people/people.module#PeopleModule',
    canLoad: [AuthGuard]
  },
  // { path: PARTY, loadChildren: '../parties/party.module#PartyModule', canLoad: [AuthGuard] },
  { path: BILLING_DETAIL, loadChildren: '../billing-details/billing-details.module#BillingDetailsModule', canLoad: [AuthGuard]},
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
