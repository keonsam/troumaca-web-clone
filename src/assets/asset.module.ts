import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetComponent} from './asset.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {PagingModule} from '../paging/paging.module';
import {SearchModule} from '../search/search.module';
import {AssetListComponent} from './asset-list/asset.list.component';
import {AssetTopMenuComponent} from './asset-top-menu/asset.top.menu.component';
import {Ng2CompleterModule} from 'ng2-completer';
import {assetServiceProvider} from './asset.service.provider';
import { AssetRoutingModule } from './asset.routing.module';
import { UnitOfMeasureModule } from '../unit-of-measure/unit.of.measure.module';
import {assetResolveProvider } from './asset.resolve.provider';
import {AssetFormComponent} from './asset-form/asset.form.component';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {authGuardProvider} from '../auth-guard/auth.guard.provider';
import {MaterialModule} from "../app/material.module";
import {SpecificationFormComponent} from "./specification-form/specification.form.component";
import {BrandFormComponent} from "./brand-form/brand.form.component";
import {CharacteristicsFormComponent} from "./characteristics-form/characteristics.form.component";
import {assetBrandResolveProvider} from "./asset.brand.resolve.provider";
import {assetSpecificationResolveProvider} from "./asset.specification.resolve.provider";
import {assetCharacteristicsResolveProvider} from "./asset.characteristics.resolve.provider";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Ng2CompleterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    SearchModule,
    PagingModule,
    AssetRoutingModule,
    UnitOfMeasureModule,
    DeleteModalModule,
    MaterialModule
  ],
  declarations: [
    AssetComponent,
    AssetFormComponent,
    AssetListComponent,
    AssetTopMenuComponent,
    SpecificationFormComponent,
    BrandFormComponent,
    CharacteristicsFormComponent,
  ],
  providers: [
    assetServiceProvider,
    assetResolveProvider,
    assetBrandResolveProvider,
    assetSpecificationResolveProvider,
    assetCharacteristicsResolveProvider,
    authGuardProvider],
  exports: [
    // AssetComponent,
    // AssetEditComponent,
    // AssetListComponent,
    // AssetTopMenuComponent,
    // AssetCreationComponent
  ]
})
export class AssetModule {}
