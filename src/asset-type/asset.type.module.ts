import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssetTypeComponent} from "./asset.type.component";
import {assetTypeRouting} from "./asset.type.routing";
import {AssetTypeService} from "./asset.type.service";
import {AssetTypeRepository} from "./asset.type.repository";
import {RouterModule} from "@angular/router";
import {LeftMenuModule} from "../left-menu/left.menu.module";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LeftMenuModule,
    assetTypeRouting,
  ],
  declarations: [
    AssetTypeComponent
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
    AssetTypeComponent
  ]
})
export class AssetTypeModule {}