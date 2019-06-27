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
  { path: '', redirectTo: AUTHENTICATION, pathMatch: 'full'},
  // { path: HOME, component: FrontHomeComponent },
  { path: AUTHENTICATION, loadChildren: () => import('../authentication/authentication.module').then(m => m.AuthenticationModule)},
  { path: LOBBY, loadChildren: () => import('../lobby/lobby.module').then(m => m.LobbyModule), canLoad: [AuthGuard]},
  { path: ASSET, loadChildren: () => import('../assets/asset.module').then(m => m.AssetModule), canLoad: [AuthGuard] },
  { path: ASSET_TYPE, loadChildren: () => import('../asset-types/asset.type.module').then(m => m.AssetTypesModule), canLoad: [AuthGuard] },
  {
    path: ASSET_CHARACTERISTICS,
    loadChildren: () => import('../asset-characteristics/asset.characteristic.module').then(m => m.AssetCharacteristicModule), canLoad: [AuthGuard]
  },
  { path: ASSET_SETTING, loadChildren: () => import('../asset-settings/asset.setting.module').then(m => m.AssetSettingModule), canLoad: [AuthGuard] },
  { path: ORGANIZATION,
    loadChildren: () => import('../parties/organizations/organization.module').then(m => m.OrganizationModule),
    canLoad: [AuthGuard]
  },
  { path: USER,
    loadChildren: () => import('../parties/users/user.module').then(m => m.UserModule),
    canLoad: [AuthGuard]
  },
  { path: PEOPLE,
    loadChildren: () => import('../parties/people/people.module').then(m => m.PeopleModule),
    canLoad: [AuthGuard]
  },
  // { path: PARTY, loadChildren: '../parties/party.module#PartyModule', canLoad: [AuthGuard] },
  { path: BILLING_DETAIL, loadChildren: () => import('../billing-details/billing-details.module').then(m => m.BillingDetailsModule), canLoad: [AuthGuard]},
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
