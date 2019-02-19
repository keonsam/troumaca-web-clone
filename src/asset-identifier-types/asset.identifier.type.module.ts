import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagingModule} from '../paging/paging.module';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {AssetIdentifierTypeComponent} from './asset.identifier.type.component';
import {AssetIdentifierTypeFormComponent} from './asset-identifier-type-form/asset.identifier.type.form.component';
import {MaterialModule} from '../app/material.module';
import {AssetIdentifierTypeListComponent} from './asset-identifier-type-listing/asset.identifier.type.list.component';
import {assetIdentifierTypeServiceProvider} from './asset.identifier.type.service.provider';
import {assetIdentifierTypeRepositoryProvider} from '../adapter/asset-identifier-types/asset.identifier.type.repository.adapter.provider';
import {assetIdentifierTypeClientProvider} from '../client/asset-identifier-types/asset.identifier.type.client.provider';
// import {AssetIdentifierTypeRoutingModule} from './asset.identifier.type.routing.module';
import {assetIdentifierTypesResolveProvider} from './asset.identifier.types.resolve.provider';
import {assetIdentifierTypeResolveProvider} from './asset.identifier.type.resolve.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    DeleteModalModule,
    // AssetIdentifierTypeRoutingModule,
    MaterialModule
  ],
  declarations: [
    AssetIdentifierTypeComponent,
    AssetIdentifierTypeFormComponent,
    AssetIdentifierTypeListComponent,
  ],
  providers: [
    assetIdentifierTypeResolveProvider,
    assetIdentifierTypesResolveProvider,
    assetIdentifierTypeServiceProvider,
    assetIdentifierTypeRepositoryProvider,
    assetIdentifierTypeClientProvider
  ],
  exports: [
    AssetIdentifierTypeFormComponent,
    AssetIdentifierTypeListComponent,
  ]
})

export class AssetIdentifierTypeModule { }
