import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetComponent} from './asset.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {PagingModule} from '../paging/paging.module';
import {SearchModule} from '../search/search.module';
import {AssetListComponent} from './asset-list/asset.list.component';
import {assetServiceProvider} from './asset.service.provider';
import { AssetRoutingModule } from './asset.routing.module';
import {assetResolveProvider } from './asset.resolve.provider';
import {AssetFormComponent} from './asset-form/asset.form.component';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {MaterialModule} from '../app/material.module';
import {assetRepositoryProvider} from '../adapter/assets/asset.repository.adapter.provider';
import {assetClientProvider} from '../client/asset/asset.client.provider';
import {AssetTypeFormModule} from '../asset-types/asset-type-form/asset.type.form.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    SearchModule,
    PagingModule,
    AssetRoutingModule,
    DeleteModalModule,
    MaterialModule,
    AssetTypeFormModule,
    FlexLayoutModule
  ],
  declarations: [
    AssetComponent,
    AssetFormComponent,
    AssetListComponent,
  ],
  providers: [
    assetServiceProvider,
    assetResolveProvider,
    assetRepositoryProvider,
    assetClientProvider,
  ],
})
export class AssetModule {}
