import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssetTypeComponent} from "./asset.type.component";
import {AssetTypeCreationComponent} from "./asset-type-creation/asset.type.creation.component";
import {AssetTypeListComponent} from "./asset-type-list/asset.type.list.component";
import {AssetTypeService} from "./asset.type.service";
import {AssetTypeRepository} from "./asset.type.repository";
import {RouterModule} from "@angular/router";
import {MenuModule} from "../menu/menu.module";
import {AssetTypeTopMenuComponent} from "./asset-type-top-menu/asset.type.top.menu.component";
import {SearchModule} from "../search/search.module";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    SearchModule
  ],
  declarations: [
    AssetTypeComponent,
    AssetTypeListComponent,
    AssetTypeCreationComponent,
    AssetTypeTopMenuComponent
  ],
  providers: [{
    provide: AssetTypeService,
    useFactory(assetTypeRepository:AssetTypeRepository) {
      let assetTypeService: AssetTypeService;
      if (!assetTypeService) {
        assetTypeService = new AssetTypeService(assetTypeRepository);
      }
      return assetTypeService;
    },
    deps: [AssetTypeRepository]
  }],
  exports: [
    AssetTypeComponent,
    AssetTypeListComponent,
    AssetTypeCreationComponent,
    AssetTypeTopMenuComponent
  ]
})
export class AssetTypesModule {}