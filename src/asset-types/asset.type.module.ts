import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetTypeComponent} from './asset.type.component';
import {AssetTypeCreationComponent} from './asset-type-creation/asset.type.creation.component';
import {AssetTypeEditComponent} from './asset-type-edit/asset.type.edit.component';
import {AssetTypeListComponent} from './asset-type-list/asset.type.list.component';
import {AssetTypeService} from './asset.type.service';
import {AssetTypeRepository} from './asset.type.repository';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {Ng2CompleterModule} from 'ng2-completer';
import {AssetTypeTopMenuComponent} from './asset-type-top-menu/asset.type.top.menu.component';
import {SearchModule} from '../search/search.module';
import {PagingModule} from '../paging/paging.module';
import {assetTypeServiceProvider} from './asset.type.service.provider';

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
    PagingModule
  ],
  declarations: [
    AssetTypeComponent,
    AssetTypeListComponent,
    AssetTypeCreationComponent,
    AssetTypeEditComponent,
    AssetTypeTopMenuComponent
  ],
  providers: [assetTypeServiceProvider],
  exports: [
    AssetTypeComponent,
    AssetTypeListComponent,
    AssetTypeCreationComponent,
    AssetTypeEditComponent,
    AssetTypeTopMenuComponent
  ]
})
export class AssetTypesModule {}
