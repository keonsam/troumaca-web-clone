import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssetIdentifierTypeComponent} from './asset.identifier.type.component';
import {AuthGuard} from '../auth-guard/auth.guard';
import {AssetIdentifierTypeFormComponent} from './asset-identifier-type-form/asset.identifier.type.form.component';
import {AssetIdentifierTypeResolve} from './asset.identifier.type.resolve';
import {AssetIdentifierTypeListComponent} from './asset-identifier-type-listing/asset.identifier.type.list.component';
import {AssetIdentifierTypesResolve} from './asset.identifier.types.resolve';
import {ASSET_IDENTIFIER_TYPE} from '../app/routes';

export const routes: Routes = [
  { path: '', component: AssetIdentifierTypeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: `${ASSET_IDENTIFIER_TYPE}/listing`, pathMatch: 'full' },
      { path: 'listing', component: AssetIdentifierTypeListComponent, resolve: { assetIdentifierTypes: AssetIdentifierTypesResolve } },
      { path: 'create', component: AssetIdentifierTypeFormComponent },
      { path: ':assetIdentifierTypeId/edit', component: AssetIdentifierTypeFormComponent, resolve: {assetIdentifierType: AssetIdentifierTypeResolve} },
    ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssetIdentifierTypeRoutingModule { }
