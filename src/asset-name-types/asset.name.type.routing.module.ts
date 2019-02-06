import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssetNameTypeComponent} from './asset.name.type.component';
import {AuthGuard} from '../auth-guard/auth.guard';
import {AssetNameTypeFormComponent} from './asset-name-type-form/asset.name.type.form.component';
import {AssetNameTypeResolve} from './asset.name.type.resolve';
import {AssetNameTypeListComponent} from './asset-name-type-listing/asset.name.type.list.component';
import {AssetNameTypesResolve} from './asset.name.types.resolve';

export const routes: Routes = [
  { path: '', component: AssetNameTypeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: '/assetNameTypes/listing', pathMatch: 'full' },
      { path: 'listing', component: AssetNameTypeListComponent, resolve: { assetNameTypes: AssetNameTypesResolve } },
      { path: 'create', component: AssetNameTypeFormComponent },
      { path: ':assetNameTypeId/edit', component: AssetNameTypeFormComponent, resolve: {assetNameType: AssetNameTypeResolve} },
    ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssetNameTypeRoutingModule { }
