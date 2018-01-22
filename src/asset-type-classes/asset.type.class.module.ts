import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssetTypeClassComponent} from "./asset.type.class.component";
import {AssetTypeClassService} from "./asset.type.class.service";
import {AssetTypeClassRepository} from "./asset.type.class.repository";
import {RouterModule} from "@angular/router";
import {MenuModule} from "../menu/menu.module";
import {AssetTypeClassListComponent} from './asset-type-class-list/asset.type.class.list.component';
import {AssetTypeClassCreationComponent} from './asset-type-class-creation/asset.type.class.creation.component';
import {AssetTypeClassTopMenuComponent} from './asset-type-class-top-menu/asset-type-class-top-menu.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule
  ],
  declarations: [
    AssetTypeClassComponent,
    AssetTypeClassListComponent,
    AssetTypeClassCreationComponent,
    AssetTypeClassTopMenuComponent
  ],
  providers: [{
    provide: AssetTypeClassService,
    useFactory(assetTypeClassRepository:AssetTypeClassRepository) {
      let assetTypeClassService: AssetTypeClassService;
      if (!assetTypeClassService) {
        assetTypeClassService = new AssetTypeClassService(assetTypeClassRepository);
      }
      return assetTypeClassService;
    },
    deps: [AssetTypeClassRepository]
  }],
  exports: [
    AssetTypeClassComponent
  ]
})
export class AssetTypeClassModule {}
