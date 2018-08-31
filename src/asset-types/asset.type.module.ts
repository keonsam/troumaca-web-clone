import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetTypeComponent} from './asset.type.component';
import {AssetTypeListComponent} from './asset-type-list/asset.type.list.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {Ng2CompleterModule} from 'ng2-completer';
import {AssetTypeTopMenuComponent} from './asset-type-top-menu/asset.type.top.menu.component';
import {SearchModule} from '../search/search.module';
import {PagingModule} from '../paging/paging.module';
import {assetTypeServiceProvider} from './asset.type.service.provider';
import { AssetTypeRoutingModule} from "./asset.type.routing.module";
import { UnitOfMeasureModule } from "../unit-of-measure/unit.of.measure.module";
import { AssetTypeFormComponent } from "./asset-type-form/asset.type.form.component";
import { assetTypeResolveProvider } from "./asset.type.resolve.provider";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    Ng2CompleterModule,
    SearchModule,
    PagingModule,
    AssetTypeRoutingModule,
    UnitOfMeasureModule
  ],
  declarations: [
    AssetTypeComponent,
    AssetTypeListComponent,
    AssetTypeFormComponent,
    AssetTypeTopMenuComponent
  ],
  providers: [assetTypeServiceProvider, assetTypeResolveProvider],
  exports: []
})
export class AssetTypesModule {}
