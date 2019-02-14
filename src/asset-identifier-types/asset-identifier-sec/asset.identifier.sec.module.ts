import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app/material.module';
import {AssetIdentifierSecComponent} from './asset.identifier.sec.component';
import {AssetIdentifierAddComponent} from './asset.identifier.add/asset.identifier.add.component';
import {assetIdentifierTypeServiceProvider} from '../asset.identifier.type.service.provider';
import {assetIdentifierTypeRepositoryProvider} from '../../adapter/asset-identifier-types/asset.identifier.type.repository.adapter.provider';
import {assetIdentifierTypeClientProvider} from '../../client/asset-identifier-types/asset.identifier.type.client.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    AssetIdentifierSecComponent,
    AssetIdentifierAddComponent
  ],
  exports: [
    AssetIdentifierSecComponent
  ],
  providers: [
    assetIdentifierTypeServiceProvider,
    assetIdentifierTypeRepositoryProvider,
    assetIdentifierTypeClientProvider
  ]
})

export class AssetIdentifierSecModule { }
