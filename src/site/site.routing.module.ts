import {Routes, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";
import {SiteComponent} from "./site.component";
import {SiteStreetAddressListComponent} from "./site-street-address-list/site.street.address.list.component";
import {SiteStreetAddressEditComponent} from "./site-street-address-edit/site.street.address.edit.component";
import {SiteStreetAddressCreationComponent} from "./site-street-address-creation/site.street.address.creation.component";
import {SitePostOfficeBoxListComponent} from "./site-post-office-box-list/site.post.office.box.list.component";
import {SitePostOfficeBoxCreationComponent} from "./site-post-office-box-creation/site.post.office.box.creation.component";
import {SitePostOfficeBoxEditComponent} from "./site-post-office-box-edit/site.post.office.box.edit.component";
import {SiteEmailListComponent} from "./site-email-list/site.email.list.component";
import {SiteEmailCreationComponent} from "./site-email-creation/site.email.creation.component";
import {SiteEmailEditComponent} from "./site-email-edit/site.email.edit.component";
import {SiteWebListComponent} from "./site-web-list/site.web.list.component";
import {SiteWebCreationComponent} from "./site-web-creation/site.web.creation.component";
import {SiteWebEditComponent} from "./site-web-edit/site.web.edit.component";
import {SitePhoneListComponent} from "./site-phone-list/site.phone.list.component";
import {SitePhoneEditComponent} from "./site-phone-edit/site.phone.edit.component";
import {SitePhoneCreationComponent} from "./site-phone-creation/site.phone.creation.component";

export const routes: Routes = [
  { path: '', component: SiteComponent,  children: [
      { path: '', redirectTo: 'sites/street-addresses', pathMatch: 'full' },
      { path: 'street-addresses', component: SiteStreetAddressListComponent },
      { path: 'street-addresses/:siteId/edit', component: SiteStreetAddressEditComponent },
      { path: 'street-addresses/create', component: SiteStreetAddressCreationComponent },
      { path: 'post-office-boxes', component: SitePostOfficeBoxListComponent },
      { path: 'post-office-boxes/create', component: SitePostOfficeBoxCreationComponent },
      { path: 'post-office-boxes/:siteId/edit', component: SitePostOfficeBoxEditComponent },
      { path: 'emails', component: SiteEmailListComponent },
      { path: 'emails/create', component: SiteEmailCreationComponent },
      { path: 'emails/:siteId/edit', component: SiteEmailEditComponent },
      { path: 'web-sites', component: SiteWebListComponent },
      { path: 'web-sites/create', component: SiteWebCreationComponent },
      { path: 'web-sites/:siteId/edit', component: SiteWebEditComponent },
      { path: 'phones', component: SitePhoneListComponent},
      { path: 'phones/:siteId/edit', component: SitePhoneEditComponent},
      { path: 'phones/create', component: SitePhoneCreationComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SiteRoutingModule { }
