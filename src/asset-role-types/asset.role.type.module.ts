import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagingModule} from '../paging/paging.module';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {AssetRoleTypeComponent} from './asset.role.type.component';
import {AssetRoleTypeFormComponent} from './asset-role-type-form/asset.role.type.form.component';
import {MaterialModule} from '../app/material.module';
import {AssetRoleTypeListComponent} from './asset-role-type-listing/asset.role.type.list.component';
import {assetRoleTypeServiceProvider} from './asset.role.type.service.provider';
import {assetRoleTypeRepositoryProvider} from '../adapter/asset-role-types/asset.role.type.repository.adapter.provider';
import {assetRoleTypeClientProvider} from '../client/asset-role-types/asset.role.type.client.provider';
// import {AssetRoleTypeRoutingModule} from './asset.role.type.routing.module';
import {assetRoleTypesResolveProvider} from './asset.role.types.resolve.provider';
import {assetRoleTypeResolveProvider} from './asset.role.type.resolve.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    DeleteModalModule,
    // AssetRoleTypeRoutingModule,
    MaterialModule
  ],
  declarations: [
    AssetRoleTypeComponent,
    AssetRoleTypeFormComponent,
    AssetRoleTypeListComponent,
  ],
  exports: [
    AssetRoleTypeFormComponent,
    AssetRoleTypeListComponent,
  ],
  providers: [
    assetRoleTypeResolveProvider,
    assetRoleTypesResolveProvider,
    assetRoleTypeServiceProvider,
    assetRoleTypeRepositoryProvider,
    assetRoleTypeClientProvider
  ],
})

export class AssetRoleTypeModule { }
