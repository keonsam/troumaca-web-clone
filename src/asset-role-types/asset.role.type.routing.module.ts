import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssetRoleTypeComponent} from './asset.role.type.component';
import {AuthGuard} from '../auth-guard/auth.guard';
import {AssetRoleTypeFormComponent} from './asset-role-type-form/asset.role.type.form.component';
import {AssetRoleTypeResolve} from './asset.role.type.resolve';
import {AssetRoleTypeListComponent} from './asset-role-type-listing/asset.role.type.list.component';
import {AssetRoleTypesResolve} from './asset.role.types.resolve';

export const routes: Routes = [
  { path: '', component: AssetRoleTypeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: '/assetRoleTypes/listing', pathMatch: 'full' },
      { path: 'listing', component: AssetRoleTypeListComponent, resolve: { assetRoleTypes: AssetRoleTypesResolve } },
      { path: 'create', component: AssetRoleTypeFormComponent },
      { path: ':assetRoleTypeId/edit', component: AssetRoleTypeFormComponent, resolve: {assetRoleType: AssetRoleTypeResolve} },
    ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssetRoleTypeRoutingModule { }
