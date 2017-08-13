import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PageNotFoundComponent} from "./page.not.found.component";
// import {pageNotFoundRouting} from "./page.not.found.routing";
import {PageNotFoundService} from "./page.not.found.service";
import {PageNotFoundRepository} from "./page.not.found.repository";
import {RouterModule} from "@angular/router";

// , pageNotFoundRouting,
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PageNotFoundComponent
  ],
  providers: [{
    provide: PageNotFoundService,
    useFactory(pageNotFoundRepository:PageNotFoundRepository) {
      let pageNotFoundService: PageNotFoundService;
      if (!pageNotFoundService) {
        pageNotFoundService = new PageNotFoundService(pageNotFoundRepository);
      }
      return pageNotFoundService;
    },
    deps: [PageNotFoundRepository]
  }],
  exports: [
    PageNotFoundComponent
  ]
})
export class PageNotFoundModule {}