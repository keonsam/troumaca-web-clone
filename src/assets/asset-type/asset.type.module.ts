import {NgModule} from '@angular/core';
import {assetTypeServiceProvider} from './asset.type.service.provider';
import {AssetTypeSelectModalComponent} from './select-modal-component/asset.type.select.modal.component';
import {AssetTypeCreateModalComponent} from './create-modal-component/asset.type.create.modal.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app/material.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AttributeModule} from '../attributes/attribute.module';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {AssetTypeListComponent} from './select-modal-component/asset-type-list/asset.type.list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule,
    FlexLayoutModule,
    VirtualScrollerModule,
    // others
    AttributeModule
  ],
  exports: [
    AssetTypeSelectModalComponent,
    AssetTypeCreateModalComponent,
  ],
  declarations: [
    AssetTypeSelectModalComponent,
    AssetTypeCreateModalComponent,
    AssetTypeListComponent
  ],
  entryComponents: [
    AssetTypeSelectModalComponent,
    AssetTypeCreateModalComponent,
  ],
  providers: [
    assetTypeServiceProvider
  ]
})
export class AssetTypeModule { }
