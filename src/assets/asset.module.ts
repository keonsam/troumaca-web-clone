import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssetComponent} from "./asset.component";
import {AssetService} from "./asset.service";
import {AssetRepository} from "./asset.repository";
import {RouterModule} from "@angular/router";
import {MenuModule} from "../menu/menu.module";
import {PagingModule} from "../paging/paging.module";
import {SearchModule} from "../search/search.module";
import {AssetContentComponent} from "./asset-content/asset.content.component";
import {AssetTopMenuComponent} from "./asset-top-menu/asset.top.menu.component";
import {AssetCreationComponent} from "./asset-creation/asset.creation.component";
import {Ng2CompleterModule} from "ng2-completer";
import {AssetTypesRepository} from "../asset-types/asset.types.repository";
import {AssetUnitOfMeasureRepository} from "./assset.unit.of.measure.repository";
import {AssetSiteRepository} from "./asset.site.repository";
import {AssetPersonRepository} from "./asset.person.repository";

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
    AssetContentComponent,
    AssetTopMenuComponent,
    AssetCreationComponent
  ],
  providers: [{
    provide: AssetService,
    useFactory(assetsRepository:AssetRepository,
               assetTypesRepository: AssetTypesRepository,
               assetUnitOfMeasureRepository:AssetUnitOfMeasureRepository,
               assetSiteRepository:AssetSiteRepository,
               assetPersonRepository:AssetPersonRepository) {
      let assetsService: AssetService;
      if (!assetsService) {
        assetsService = new AssetService(
          assetsRepository,
          assetTypesRepository,
          assetUnitOfMeasureRepository,
          assetSiteRepository,
          assetPersonRepository);
      }
      return assetsService;
    },
    deps: [AssetRepository, AssetTypesRepository, AssetUnitOfMeasureRepository, AssetSiteRepository, AssetPersonRepository]
  }],
  exports: [
    AssetComponent,
    AssetContentComponent,
    AssetTopMenuComponent,
    AssetCreationComponent
  ]
})
export class AssetModule {}