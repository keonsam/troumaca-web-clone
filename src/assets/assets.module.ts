import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssetsComponent} from "./assets.component";
import {assetsRouting} from "./assets.routing";
import {AssetsService} from "./assets.service";
import {AssetsRepository} from "./assets.repository";
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
    // assetsRouting,
  ],
  declarations: [
    AssetsComponent
  ],
  providers: [{
    provide: AssetsService,
    useFactory(assetsRepository:AssetsRepository) {
      let assetsService: AssetsService;
      if (!assetsService) {
        assetsService = new AssetsService(assetsRepository);
      }
      return assetsService;
    },
    deps: [AssetsRepository]
  }],
  exports: [
    AssetsComponent
  ]
})
export class AssetsModule {}