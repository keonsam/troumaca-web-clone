import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetTypeComponent} from './asset.type.component';
import {AssetTypeListComponent} from './asset-type-list/asset.type.list.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {AssetTypeTopMenuComponent} from './asset-type-top-menu/asset.type.top.menu.component';
import {SearchModule} from '../search/search.module';
import {PagingModule} from '../paging/paging.module';
import {assetTypeServiceProvider} from './asset.type.service.provider';
import { AssetTypeRoutingModule} from './asset.type.routing.module';
import { UnitOfMeasureModule } from '../unit-of-measure/unit.of.measure.module';
import { AssetTypeFormComponent } from './asset-type-form/asset.type.form.component';
import { assetTypeResolveProvider } from './asset.type.resolve.provider';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {assetTypeRepositoryProvider} from '../adapter/asset-types/asset.repository.adapter.provider';
import {assetTypesClientProvider} from '../client/asset-type/asset.types.client.provider';
import {AssetSpecificationFormModule} from '../assets/asset-specification/asset.specification.form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    SearchModule,
    PagingModule,
    AssetTypeRoutingModule,
    UnitOfMeasureModule,
    DeleteModalModule,
    AssetSpecificationFormModule
  ],
  declarations: [
    AssetTypeComponent,
    AssetTypeListComponent,
    AssetTypeFormComponent,
    AssetTypeTopMenuComponent
  ],
  providers: [assetTypeServiceProvider,
    assetTypeResolveProvider,
    assetTypeRepositoryProvider,
    assetTypesClientProvider,
  ],
  exports: []
})
export class AssetTypesModule {}
