import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SiteComponent} from './site.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {SiteTopMenuComponent} from './site-top-menu/site.top.menu.component';
import { SiteEmailFormComponent } from './site-email-form/site.email.form.component';
import {SiteEmailListComponent} from './site-email-list/site.email.list.component';
import {SitePhoneListComponent} from './site-phone-list/site.phone.list.component';
import {SitePostOfficeBoxListComponent} from './site-post-office-box-list/site.post.office.box.list.component';
import {SiteStreetAddressListComponent} from './site-street-address-list/site.street.address.list.component';
import {SiteWebListComponent} from './site-web-list/site.web.list.component';
import {SearchModule} from '../search/search.module';
import {PagingModule} from '../paging/paging.module';
import {siteServiceProvider} from './site.service.provider';
import { SiteRoutingModule } from './site.routing.module';
import { emailResolveProvider } from './site-email-form/email.resolve.provider';
import { SitePhoneFormComponent } from './site-phone-form/site.phone.form.component';
import { phoneResolveProvider } from './site-phone-form/phone.resolve.provider';
import { SitePostOfficeBoxFormComponent } from './site-post-office-box-form/site.post.office.box.form.component';
import { postOfficeBoxResolveProvider } from './site-post-office-box-form/post.office.box.resolve.provider';
import { SiteStreetAddressFormComponent } from './site-street-address-form/site.street.address.form.component';
import { streetAddressResolveProvider } from './site-street-address-form/street.address.resolve.provider';
import { SiteWebFormComponent } from './site-web-form/site.web.form.component';
import { webSiteResolveProvider } from './site-web-form/web.site.resolve.provider';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MenuModule,
    SearchModule,
    PagingModule,
    SiteRoutingModule
  ],
  declarations: [
    SiteComponent,
    SiteTopMenuComponent,
    SiteEmailFormComponent,
    SiteEmailListComponent,
    SitePhoneFormComponent,
    SitePhoneListComponent,
    SiteStreetAddressFormComponent,
    SitePostOfficeBoxFormComponent,
    SitePostOfficeBoxListComponent,
    SiteStreetAddressListComponent,
    SiteWebFormComponent,
    SiteWebListComponent
  ],
  providers: [siteServiceProvider, emailResolveProvider, phoneResolveProvider,
    postOfficeBoxResolveProvider, streetAddressResolveProvider, webSiteResolveProvider],
  exports: []
})
export class SiteModule {}
