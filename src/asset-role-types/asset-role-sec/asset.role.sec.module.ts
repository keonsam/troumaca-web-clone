import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app/material.module';
import {AssetRoleSecComponent} from './asset.role.sec.component';
import {AssetRoleAddComponent} from './asset.role.add/asset.role.add.component';
import {assetRoleTypeServiceProvider} from '../asset.role.type.service.provider';
import {assetRoleTypeRepositoryProvider} from '../../adapter/asset-role-types/asset.role.type.repository.adapter.provider';
import {assetRoleTypeClientProvider} from '../../client/asset-role-types/asset.role.type.client.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    AssetRoleSecComponent,
    AssetRoleAddComponent
  ],
  exports: [
    AssetRoleSecComponent
  ],
  providers: [
    assetRoleTypeServiceProvider,
    assetRoleTypeRepositoryProvider,
    assetRoleTypeClientProvider
  ]
})

export class AssetRoleSecModule { }
