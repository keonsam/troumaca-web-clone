import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagingModule} from '../paging/paging.module';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {AssetCharacteristicComponent} from './asset.characteristic.component';
import {AssetCharacteristicFormComponent} from './asset-characteristic-form/asset.characteristic.form.component';
import {MaterialModule} from '../app/material.module';
import {AssetCharacteristicListComponent} from './asset-characteristic-listing/asset.characteristic.list.component';
import {assetCharacteristicServiceProvider} from './asset.characteristic.service.provider';
import { assetCharacteristicRepositoryProvider} from '../adapter/asset.characteristics/asset.characteristic.repository.adapter.provider';
import {assetCharacteristicClientProvider} from '../client/asset-characteristics/asset.characteristic.client.provider';
import {AssetCharacteristicRoutingModule} from './asset.characteristic.routing.module';
import {assetCharacteristicsResolveProvider} from './asset.characteristics.resolve.provider';
import {assetCharacteristicResolveProvider} from './asset.characteristic.resolve.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    DeleteModalModule,
    AssetCharacteristicRoutingModule,
    MaterialModule
  ],
  declarations: [
    AssetCharacteristicComponent,
    AssetCharacteristicFormComponent,
    AssetCharacteristicListComponent,
  ],
  providers: [
    assetCharacteristicResolveProvider,
    assetCharacteristicsResolveProvider,
    assetCharacteristicServiceProvider,
    assetCharacteristicRepositoryProvider,
    assetCharacteristicClientProvider
  ],
  exports: []
})

export class AssetCharacteristicModule { }
