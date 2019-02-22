import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssetTypeComponent} from './asset.type.component';
import {AssetTypeListComponent} from './asset-type-list/asset.type.list.component';
import {RouterModule} from '@angular/router';
import {SearchModule} from '../search/search.module';
import {PagingModule} from '../paging/paging.module';
import {assetTypeServiceProvider} from './asset.type.service.provider';
import { AssetTypeRoutingModule} from './asset.type.routing.module';
import { assetTypeResolveProvider } from './asset.type.resolve.provider';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {assetTypeRepositoryProvider} from '../adapter/asset-types/asset.repository.adapter.provider';
import {assetTypesClientProvider} from '../client/asset-type/asset.types.client.provider';
import {MaterialModule} from '../app/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AssetTypeFormModule} from './asset-type-form/asset.type.form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SearchModule,
    PagingModule,
    AssetTypeRoutingModule,
    MaterialModule,
    DeleteModalModule,
    FlexLayoutModule,
    AssetTypeFormModule
  ],
  declarations: [
    AssetTypeComponent,
    AssetTypeListComponent,
  ],
  providers: [
    assetTypeServiceProvider,
    assetTypeResolveProvider,
    assetTypeRepositoryProvider,
    assetTypesClientProvider,
  ],
  exports: []
})
export class AssetTypesModule {}
