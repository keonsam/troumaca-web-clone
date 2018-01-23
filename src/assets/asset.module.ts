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
import {AssetListComponent} from "./asset-list/asset.list.component";
import {AssetTopMenuComponent} from "./asset-top-menu/asset.top.menu.component";
import {AssetCreationComponent} from "./asset-creation/asset.creation.component";
import {Ng2CompleterModule} from "ng2-completer";
import {AssetTypeRepository} from "../asset-types/asset.type.repository";
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
    AssetListComponent,
    AssetTopMenuComponent,
    AssetCreationComponent
  ],
  providers: [{
    provide: AssetService,
    useFactory(assetRepository:AssetRepository,
               assetTypeRepository: AssetTypeRepository,
               assetUnitOfMeasureRepository:AssetUnitOfMeasureRepository,
               assetSiteRepository:AssetSiteRepository,
               assetPersonRepository:AssetPersonRepository) {
      let assetService: AssetService;
      if (!assetService) {
        assetService = new AssetService(
          assetRepository,
          assetTypeRepository,
          assetUnitOfMeasureRepository,
          assetSiteRepository,
          assetPersonRepository);
      }
      return assetService;
    },
    deps: [AssetRepository, AssetTypeRepository, AssetUnitOfMeasureRepository, AssetSiteRepository, AssetPersonRepository]
  }],
  exports: [
    AssetComponent,
    AssetListComponent,
    AssetTopMenuComponent,
    AssetCreationComponent
  ]
})
export class AssetModule {}