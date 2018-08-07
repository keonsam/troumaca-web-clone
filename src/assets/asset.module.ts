import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetComponent} from './asset.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {PagingModule} from '../paging/paging.module';
import {SearchModule} from '../search/search.module';
import {AssetEditComponent} from './asset-edit/asset.edit.component';
import {AssetListComponent} from './asset-list/asset.list.component';
import {AssetTopMenuComponent} from './asset-top-menu/asset.top.menu.component';
import {AssetCreationComponent} from './asset-creation/asset.creation.component';
import {Ng2CompleterModule} from 'ng2-completer';
import {assetServiceProvider} from './asset.service.provider';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    Ng2CompleterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    PagingModule,
    SearchModule,
    PagingModule
  ],
  declarations: [
    AssetComponent,
    AssetEditComponent,
    AssetListComponent,
    AssetTopMenuComponent,
    AssetCreationComponent
  ],
  providers: [assetServiceProvider],
  exports: [
    AssetComponent,
    AssetEditComponent,
    AssetListComponent,
    AssetTopMenuComponent,
    AssetCreationComponent
  ]
})
export class AssetModule {}
