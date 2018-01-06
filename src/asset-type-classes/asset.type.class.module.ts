import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssetTypeClassComponent} from "./asset.type.class.component";
import {AssetTypeClassService} from "./asset.type.class.service";
import {AssetTypeClassRepository} from "./asset.type.class.repository";
import {RouterModule} from "@angular/router";
import {MenuModule} from "../menu/menu.module";

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
    AssetTypeClassComponent
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