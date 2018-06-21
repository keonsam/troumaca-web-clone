import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetTypeClassComponent} from './asset.type.class.component';
import {AssetTypeClassService} from './asset.type.class.service';
import {AssetTypeClassRepository} from './asset.type.class.repository';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {AssetTypeClassListComponent} from './asset-type-class-list/asset.type.class.list.component';
import {AssetTypeClassCreationComponent} from './asset-type-class-creation/asset.type.class.creation.component';
import {AssetTypeClassTopMenuComponent} from './asset-type-class-top-menu/asset-type-class-top-menu.component';
import {AssetTypeClassEditComponent} from './asset-type-class-edit/asset.type.class.edit.component';
import {PagingModule} from '../paging/paging.module';
import {SearchModule} from '../search/search.module';
import {Ng2CompleterModule} from 'ng2-completer';

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
    SearchModule
  ],
  declarations: [
    AssetTypeClassComponent,
    AssetTypeClassListComponent,
    AssetTypeClassCreationComponent,
    AssetTypeClassTopMenuComponent,
    AssetTypeClassEditComponent
  ],
  providers: [{
    provide: AssetTypeClassService,
    useFactory(assetTypeClassRepository: AssetTypeClassRepository) {
      let assetTypeClassService: AssetTypeClassService;
      if (!assetTypeClassService) {
        assetTypeClassService = new AssetTypeClassService(assetTypeClassRepository);
      }
      return assetTypeClassService;
    },
    deps: [AssetTypeClassRepository]
  }],
  exports: [
    AssetTypeClassComponent,
    AssetTypeClassListComponent,
    AssetTypeClassCreationComponent,
    AssetTypeClassTopMenuComponent,
    AssetTypeClassEditComponent
  ]
})
export class AssetTypeClassModule {}
