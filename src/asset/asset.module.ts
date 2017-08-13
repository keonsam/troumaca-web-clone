import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssetComponent} from "./asset.component";
import {assetRouting} from "./asset.routing";
import {AssetService} from "./asset.service";
import {AssetRepository} from "./asset.repository";
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
    assetRouting,
  ],
  declarations: [
    AssetComponent
  ],
  providers: [{
    provide: AssetService,
    useFactory(assetRepository:AssetRepository) {
      let assetService: AssetService;
      if (!assetService) {
        assetService = new AssetService(assetRepository);
      }
      return assetService;
    },
    deps: [AssetRepository]
  }],
  exports: [
    AssetComponent
  ]
})
export class AssetModule {}