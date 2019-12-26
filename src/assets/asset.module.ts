import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetComponent} from './asset.component';
import {RouterModule} from '@angular/router';
import {assetServiceProvider} from './asset.service.provider';
import { AssetRoutingModule } from './asset.routing.module';
import {assetResolveProvider } from './asset.resolve.provider';
import {MaterialModule} from '../app/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AssetCreateModalComponent} from './asset-create-modal/asset.create.modal.component';
import {AssetTopMenuComponent} from './asset-top-menu/asset.top.menu.component';
import {AssetSortComponent} from './asset-sort/asset.sort.component';
import {AssetListComponent} from './asset-list/asset.list.component';
import {AssetListEmptyComponent} from './asset-list/asset-list-empty/asset.list.empty.component';
import {AssetTypeModule} from './asset-type/asset.type.module';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import {AssetListFullComponent} from './asset-list/asset-list-full/asset.list.full.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AssetRoutingModule,
    MaterialModule,
    FontAwesomeModule,
    FlexLayoutModule,
    VirtualScrollerModule,
    // other
    AssetTypeModule
  ],
  declarations: [
    AssetComponent,
    AssetCreateModalComponent,
    AssetTopMenuComponent,
    AssetSortComponent,
    AssetListComponent,
    AssetListEmptyComponent,
    AssetListFullComponent
  ],
  entryComponents: [
    AssetCreateModalComponent,
  ],
  providers: [
    assetServiceProvider,
    assetResolveProvider,
  ],
})
export class AssetModule {}
