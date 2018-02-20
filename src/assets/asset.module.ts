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
import {AssetEditComponent} from "./asset-edit/asset.edit.component";
import {AssetListComponent} from "./asset-list/asset.list.component";
import {AssetTopMenuComponent} from "./asset-top-menu/asset.top.menu.component";
import {AssetCreationComponent} from "./asset-creation/asset.creation.component";
import {Ng2CompleterModule} from "ng2-completer";

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
    AssetEditComponent,
    AssetListComponent,
    AssetTopMenuComponent,
    AssetCreationComponent
  ],
  providers: [{
    provide: AssetService,
    useFactory(assetRepository:AssetRepository) {
      let assetService: AssetService;
      if (!assetService) {
        assetService = new AssetService(
          assetRepository);
      }
      return assetService;
    },
    deps: [AssetRepository]
  }],
  exports: [
    AssetComponent,
    AssetEditComponent,
    AssetListComponent,
    AssetTopMenuComponent,
    AssetCreationComponent
  ]
})
export class AssetModule {}
