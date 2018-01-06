import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssetTypesComponent} from "./asset.types.component";
import {AssetTypesService} from "./asset.types.service";
import {AssetTypesRepository} from "./asset.types.repository";
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
    AssetTypesComponent
  ],
  providers: [{
    provide: AssetTypesService,
    useFactory(assetTypeRepository:AssetTypesRepository) {
      let assetTypeService: AssetTypesService;
      if (!assetTypeService) {
        assetTypeService = new AssetTypesService(assetTypeRepository);
      }
      return assetTypeService;
    },
    deps: [AssetTypesRepository]
  }],
  exports: [
    AssetTypesComponent
  ]
})
export class AssetTypesModule {}