import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetTypeClassComponent} from './asset.type.class.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {AssetTypeClassListComponent} from './asset-type-class-list/asset.type.class.list.component';
import {AssetTypeClassCreationComponent} from './asset-type-class-creation/asset.type.class.creation.component';
import {AssetTypeClassTopMenuComponent} from './asset-type-class-top-menu/asset-type-class-top-menu.component';
import {AssetTypeClassEditComponent} from './asset-type-class-edit/asset.type.class.edit.component';
import {assetTypeClassServiceProvider} from './asset.type.class.service.provider';
import {PagingModule} from '../paging/paging.module';
import {SearchModule} from '../search/search.module';
import {Ng2CompleterModule} from 'ng2-completer';
import { AssetTypeClassRoutingModule } from "./asset.type.class.routing.module";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    Ng2CompleterModule,
    ReactiveFormsModule,
    MenuModule,
    PagingModule,
    SearchModule,
    AssetTypeClassRoutingModule
  ],
  declarations: [
    AssetTypeClassComponent,
    AssetTypeClassListComponent,
    AssetTypeClassCreationComponent,
    AssetTypeClassTopMenuComponent,
    AssetTypeClassEditComponent
  ],
  providers: [assetTypeClassServiceProvider],
  exports: [
    // AssetTypeClassComponent,
    // AssetTypeClassListComponent,
    // AssetTypeClassCreationComponent,
    // AssetTypeClassTopMenuComponent,
    // AssetTypeClassEditComponent
  ]
})
export class AssetTypeClassModule {}
