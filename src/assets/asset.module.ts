import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetComponent} from './asset.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {PagingModule} from '../paging/paging.module';
import {SearchModule} from '../search/search.module';
import {AssetListComponent} from './asset-list/asset.list.component';
import {AssetTopMenuComponent} from './asset-top-menu/asset.top.menu.component';
import {assetServiceProvider} from './asset.service.provider';
import { AssetRoutingModule } from './asset.routing.module';
import { UnitOfMeasureModule } from '../unit-of-measure/unit.of.measure.module';
import {assetResolveProvider } from './asset.resolve.provider';
import {AssetFormComponent} from './asset-form/asset.form.component';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {MaterialModule} from '../app/material.module';
import {assetRepositoryProvider} from '../adapter/assets/asset.repository.adapter.provider';
import {assetClientProvider} from '../client/asset/asset.client.provider';
import {AssetSpecificationFormModule} from './asset-specification/asset.specification.form.module';
import {AssetCharacteristicSecModule} from '../asset-characteristics/asset-characteristic-sec/asset.characteristic.sec.module';
import {AssetNameSecModule} from '../asset-name-types/asset-name-sec/asset.name.sec.module';
import {AssetIdentifierSecModule} from '../asset-identifier-types/asset-identifier-sec/asset.identifier.sec.module';
import {AssetRoleSecModule} from '../asset-role-types/asset-role-sec/asset.role.sec.module';

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
    UnitOfMeasureModule,
    DeleteModalModule,
    MaterialModule,
    AssetSpecificationFormModule,
    AssetCharacteristicSecModule,
    AssetNameSecModule,
    AssetIdentifierSecModule,
    AssetRoleSecModule
  ],
  declarations: [
    AssetComponent,
    AssetFormComponent,
    AssetListComponent,
    AssetTopMenuComponent,
  ],
  providers: [
    assetServiceProvider,
    assetResolveProvider,
    assetRepositoryProvider,
    assetClientProvider,
  ],
  exports: [
    // AssetComponent,
    // AssetEditComponent,
    // AssetListComponent,
    // AssetTopMenuComponent,
    // AssetCreationComponent
  ]
})
export class AssetModule {}
