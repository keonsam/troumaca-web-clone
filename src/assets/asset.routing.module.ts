import {Routes, RouterModule} from '@angular/router';
import {AssetComponent} from './asset.component';
import {AssetListComponent} from './asset-list/asset.list.component';
import {NgModule} from '@angular/core';
import {AssetFormComponent} from './asset-form/asset.form.component';
import {AssetResolve} from './asset.resolve';
import {AuthGuard} from '../auth-guard/auth.guard';
import * as ROUTES from '../app/routes';

export const routes: Routes = [
  { path: '', component: AssetComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: `${ROUTES.ASSET}/listing`, pathMatch: 'full' },
      { path: 'listing', component: AssetListComponent },
      { path: 'create', component: AssetFormComponent },
      { path: ':assetId/edit', component: AssetFormComponent, resolve: { asset: AssetResolve} }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssetRoutingModule { }
