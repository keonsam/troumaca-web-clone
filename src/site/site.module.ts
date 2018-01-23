import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SiteComponent} from "./site.component";
import {SiteService} from "./site.service";
import {SiteRepository} from "./site.repository";
import {siteRouting} from "./site.routing";
import {RouterModule} from "@angular/router";
import {MenuModule} from "../menu/menu.module";
import {SiteCreationComponent} from "./site-creation/site.creation.component";
import {SiteListComponent} from "./site-list/site.list.component";
import {SiteTopMenuComponent} from "./site-top-menu/site.top.menu.component";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    siteRouting,
    MenuModule
  ],
  declarations: [
    SiteComponent,
    SiteCreationComponent,
    SiteListComponent,
    SiteTopMenuComponent
  ],
  providers: [{
    provide: SiteService,
    useFactory(siteRepository:SiteRepository) {
      let siteService: SiteService;
      if (!siteService) {
        siteService = new SiteService(siteRepository);
      }
      return siteService;
    },
    deps: [SiteRepository]
  }],
  exports: [
    SiteComponent,
    SiteCreationComponent,
    SiteListComponent,
    SiteTopMenuComponent
  ]
})
export class SiteModule {}