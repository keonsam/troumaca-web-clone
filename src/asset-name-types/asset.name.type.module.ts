import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagingModule} from '../paging/paging.module';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {AssetNameTypeComponent} from './asset.name.type.component';
import {AssetNameTypeFormComponent} from './asset-name-type-form/asset.name.type.form.component';
import {MaterialModule} from '../app/material.module';
import {AssetNameTypeListComponent} from './asset-name-type-listing/asset.name.type.list.component';
import {assetNameTypeServiceProvider} from './asset.name.type.service.provider';
import {assetNameTypeRepositoryProvider} from '../adapter/asset-name-types/asset.name.type.repository.adapter.provider';
import {assetNameTypeClientProvider} from '../client/asset-name-types/asset.name.type.client.provider';
// import {AssetNameTypeRoutingModule} from './asset.name.type.routing.module';
import {assetNameTypesResolveProvider} from './asset.name.types.resolve.provider';
import {assetNameTypeResolveProvider} from './asset.name.type.resolve.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    DeleteModalModule,
    // AssetNameTypeRoutingModule,
    MaterialModule
  ],
  declarations: [
    AssetNameTypeComponent,
    AssetNameTypeFormComponent,
    AssetNameTypeListComponent,
  ],
  providers: [
    assetNameTypeResolveProvider,
    assetNameTypesResolveProvider,
    assetNameTypeServiceProvider,
    assetNameTypeRepositoryProvider,
    assetNameTypeClientProvider
  ],
  exports: [
    AssetNameTypeFormComponent,
    AssetNameTypeListComponent,
  ]
})

export class AssetNameTypeModule { }
