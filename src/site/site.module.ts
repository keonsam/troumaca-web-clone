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
import {SiteTopMenuComponent} from "./site-top-menu/site.top.menu.component";
import {SiteEmailListComponent} from "./site-email-list/site.email.list.component";
import {SitePhoneListComponent} from "./site-phone-list/site.phone.list.component";
import {SitePostOfficeBoxCreationComponent} from "./site-post-office-box-creation/site.post.office.box.creation.component";
import {SitePostOfficeBoxEditComponent} from "./site-post-office-box-edit/site.post.office.box.edit.component";
import {SitePostOfficeBoxListComponent} from "./site-post-office-box-list/site.post.office.box.list.component";
import {SiteStreetAddressListComponent} from "./site-street-address-list/site.street.address.list.component";
import {SiteWebListComponent} from "./site-web-list/site.web.list.component";
import {SearchModule} from "../search/search.module";
import {SiteStreetAddressCreationComponent} from "./site-street-address-creation/site.street.address.creation.component";
import {SitePhoneCreationComponent} from "./site-phone-creation/site.phone.creation.component";
import {PagingModule} from "../paging/paging.module";
import {SiteStreetAddressEditComponent} from "./site-street-address-edit/site.street.address.edit.component";
import {SitePhoneEditComponent} from "./site-phone-edit/site.phone.edit.component";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    // FormsModule,
    RouterModule,
    ReactiveFormsModule,
    siteRouting,
    MenuModule,
    SearchModule,
    PagingModule
  ],
  declarations: [
    SiteComponent,
    SiteCreationComponent,
    SiteTopMenuComponent,
    SiteEmailListComponent,
    SitePhoneListComponent,
    SiteStreetAddressCreationComponent,
    SitePhoneCreationComponent,
    SiteStreetAddressEditComponent,
    SitePhoneEditComponent,
    SitePostOfficeBoxCreationComponent,
    SitePostOfficeBoxEditComponent,
    SitePostOfficeBoxListComponent,
    SiteStreetAddressListComponent,
    SiteWebListComponent
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
    SiteTopMenuComponent,
    SiteStreetAddressCreationComponent,
    SiteEmailListComponent,
    SitePhoneListComponent,
    SitePhoneCreationComponent,
    SiteStreetAddressEditComponent,
    SitePhoneEditComponent,
    SitePostOfficeBoxCreationComponent,
    SitePostOfficeBoxEditComponent,
    SitePostOfficeBoxListComponent,
    SiteStreetAddressListComponent,
    SiteWebListComponent
  ]
})
export class SiteModule {}
