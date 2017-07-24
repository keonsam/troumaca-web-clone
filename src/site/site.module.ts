import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SiteComponent} from "./site.component";
import {SiteService} from "./site.service";
import {SiteRepository} from "./site.repository";
import {siteRouting} from "./site.routing";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    siteRouting,
  ],
  declarations: [
    SiteComponent
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
    SiteComponent
  ]
})
export class SiteModule {}