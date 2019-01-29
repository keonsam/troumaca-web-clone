import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app/material.module';
import {AssetSpecificationFormComponent} from './asset.specification.form.component';
import {assetServiceProvider} from '../asset.service.provider';
import {assetRepositoryProvider} from '../../adapter/assets/asset.repository.adapter.provider';
import {assetClientProvider} from '../../client/asset/asset.client.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    AssetSpecificationFormComponent
  ],
  providers: [
    assetServiceProvider,
    assetRepositoryProvider,
    assetClientProvider,
  ],
  exports: [
    AssetSpecificationFormComponent
  ]
})

export class AssetSpecificationFormModule {}
