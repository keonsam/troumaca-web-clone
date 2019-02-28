import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app/material.module';
import {AssetNameSecComponent} from './asset.name.sec.component';
import {assetNameTypeServiceProvider} from '../asset.name.type.service.provider';
import {assetNameTypeRepositoryProvider} from '../../adapter/asset-name-types/asset.name.type.repository.adapter.provider';
import {assetNameTypeClientProvider} from '../../client/asset-name-types/asset.name.type.client.provider';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    AssetNameSecComponent,
  ],
  exports: [
    AssetNameSecComponent
  ],
  providers: [
    assetNameTypeServiceProvider,
    assetNameTypeRepositoryProvider,
    assetNameTypeClientProvider
  ]
})

export class AssetNameSecModule { }
