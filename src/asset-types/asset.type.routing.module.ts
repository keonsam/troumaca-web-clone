import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AssetTypeComponent} from './asset.type.component';
import {AssetTypeListComponent} from './asset-type-list/asset.type.list.component';
import { AssetTypeFormComponent } from "./asset-type-form/asset.type.form.component";
import {AssetTypeResolve} from "./asset.type.resolve";
import {AuthGuard} from "../auth-guard/auth.guard";
import {ASSET_TYPE} from '../app/routes';

export const routes: Routes = [
  { path: '', component: AssetTypeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: `${ASSET_TYPE}/listing`, pathMatch: 'full' },
      { path: 'listing', component: AssetTypeListComponent },
      { path: 'create', component: AssetTypeFormComponent },
      { path: ':assetTypeId/edit', component: AssetTypeFormComponent, resolve: {assetType: AssetTypeResolve} },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssetTypeRoutingModule { }
