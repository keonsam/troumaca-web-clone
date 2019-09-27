import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetComponent} from './asset.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
// import {PagingModule} from '../paging/paging.module';
// import {SearchModule} from '../search/search.module';
// import {AssetListComponent} from './asset-list/asset.list.component';
import {assetServiceProvider} from './asset.service.provider';
import { AssetRoutingModule } from './asset.routing.module';
import {assetResolveProvider } from './asset.resolve.provider';
// import {AssetFormComponent} from './asset-form/asset.form.component';
// import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {MaterialModule} from '../app/material.module';
// import {assetRepositoryProvider} from '../adapter/assets/asset.repository.adapter.provider';
// import {assetClientProvider} from '../client/asset/asset.client.provider';
// import {AssetTypeFormModule} from '../asset-types/asset-type-form/asset.type.form.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AssetCreateModalComponent} from './asset-create-modal/asset.create.modal.component';
import {AssetTypeSelectModalComponent} from './asset-type/select-modal-component/asset.type.select.modal.component';
import {AssetTypeCreateModalComponent} from './asset-type/create-modal-component/asset.type.create.modal.component';
import {AttributeSelectModalComponent} from './attributes/attributes-select-modal-component/attribute.select.modal.component';
import {AttributeCreateModalComponent} from './attributes/attributes-create-modal-component/attribute.create.modal.component';
import {attributeServiceProvider} from './attributes/attribute.service.provider';
import {assetTypeServiceProvider} from './asset-type/asset.type.service.provider';
import {AssetTopMenuComponent} from './asset-top-menu/asset.top.menu.component';
import {AssetSortComponent} from './asset-sort/asset.sort.component';
import {AssetListComponent} from './asset-list/asset.list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    // SearchModule,
    // PagingModule,
    AssetRoutingModule,
    // DeleteModalModule,
    MaterialModule,
    FontAwesomeModule,
    // AssetTypeFormModule,
    FlexLayoutModule
  ],
  declarations: [
    AssetComponent,
    AssetCreateModalComponent,
    AssetTypeSelectModalComponent,
    AssetTypeCreateModalComponent,
    AttributeSelectModalComponent,
    AttributeCreateModalComponent,
    AssetTopMenuComponent,
    AssetSortComponent,
    AssetListComponent
  ],
  entryComponents: [
    AssetCreateModalComponent,
    AssetTypeSelectModalComponent,
    AssetTypeCreateModalComponent,
    AttributeSelectModalComponent,
    AttributeCreateModalComponent
  ],
  providers: [
    assetServiceProvider,
    attributeServiceProvider,
    assetResolveProvider,
    assetTypeServiceProvider
    // assetRepositoryProvider,
    // assetClientProvider,
  ],
})
export class AssetModule {}
