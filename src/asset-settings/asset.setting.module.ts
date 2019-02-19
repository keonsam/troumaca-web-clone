import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../app/material.module';
import {AssetSettingComponent} from './asset.setting.component';
import {BrandModule} from '../brands/brand.module';
import {AssetIdentifierTypeModule} from '../asset-identifier-types/asset.identifier.type.module';
import {AssetNameTypeModule} from '../asset-name-types/asset.name.type.module';
import {AssetRoleTypeModule} from '../asset-role-types/asset.role.type.module';
import {AssetSettingRoutingModule} from './asset.setting.routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UnitOfMeasureModule} from '../unit-of-measure/unit.of.measure.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    BrandModule,
    AssetSettingRoutingModule,
    AssetIdentifierTypeModule,
    AssetNameTypeModule,
    AssetRoleTypeModule,
    UnitOfMeasureModule
  ],
  declarations: [
    AssetSettingComponent
  ]
})
export class AssetSettingModule {}
