import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetCharacteristicFormComponent} from './asset.characteristic.form.component';
import {MaterialModule} from '../../app/material.module';
import {assetCharacteristicServiceProvider} from '../asset.characteristic.service.provider';
import { assetCharacteristicRepositoryProvider} from '../../adapter/asset.characteristics/asset.characteristic.repository.adapter.provider';
import {assetCharacteristicClientProvider} from '../../client/asset-characteristics/asset.characteristic.client.provider';
import {assetCharacteristicResolveProvider} from '../asset.characteristic.resolve.provider';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UnitOfMeasureFormModule} from '../../unit-of-measure/unit-of-measure-form/unit.of.measure.form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    UnitOfMeasureFormModule,
  ],
  declarations: [
    AssetCharacteristicFormComponent,
  ],
  providers: [
    assetCharacteristicResolveProvider,
    assetCharacteristicServiceProvider,
    assetCharacteristicRepositoryProvider,
    assetCharacteristicClientProvider
  ],
  exports: [
    AssetCharacteristicFormComponent
  ]
})

export class AssetCharacteristicFormModule { }
