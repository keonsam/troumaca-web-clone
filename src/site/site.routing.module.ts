// import {Routes, RouterModule} from '@angular/router';
// import {NgModule} from '@angular/core';
// import {SiteComponent} from './site.component';
// import {SiteStreetAddressListComponent} from './site-street-address-list/site.street.address.list.component';
// import {SitePostOfficeBoxListComponent} from './site-post-office-box-list/site.post.office.box.list.component';
//
// import { SiteEmailFormComponent } from './site-email-form/site.email.form.component';
// import {SiteEmailListComponent} from './site-email-list/site.email.list.component';
//
// import {SiteWebListComponent} from './site-web-list/site.web.list.component';
//
// import {SitePhoneListComponent} from './site-phone-list/site.phone.list.component';
// import { SitePhoneFormComponent } from './site-phone-form/site.phone.form.component';
// import {PhoneResolve} from './site-phone-form/phone.resolve';
// import {EmailResolve} from './site-email-form/email.resolve';
// import { SitePostOfficeBoxFormComponent } from './site-post-office-box-form/site.post.office.box.form.component';
// import {PostOfficeBoxResolve} from './site-post-office-box-form/post.office.box.resolve';
// import { SiteStreetAddressFormComponent } from './site-street-address-form/site.street.address.form.component';
// import { StreetAddressResolve } from './site-street-address-form/street.address.resolve';
// import { SiteWebFormComponent } from './site-web-form/site.web.form.component';
// import {WebSiteResolve} from './site-web-form/web.site.resolve';
// import {AuthGuard} from "../auth-guard/auth.guard";
//
// export const routes: Routes = [
//   { path: '', component: SiteComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
//       { path: '', redirectTo: '/sites/street-addresses', pathMatch: 'full' },
//       { path: 'street-addresses', component: SiteStreetAddressListComponent },
//       { path: 'street-addresses/create', component: SiteStreetAddressFormComponent },
//       { path: 'street-addresses/:siteId/edit', component: SiteStreetAddressFormComponent, resolve: { streetAddress: StreetAddressResolve} },
//       { path: 'post-office-boxes', component: SitePostOfficeBoxListComponent },
//       { path: 'post-office-boxes/create', component: SitePostOfficeBoxFormComponent },
//       { path: 'post-office-boxes/:siteId/edit', component: SitePostOfficeBoxFormComponent, resolve: {postOfficeBox: PostOfficeBoxResolve} },
//       { path: 'emails', component: SiteEmailListComponent },
//       { path: 'emails/create', component: SiteEmailFormComponent },
//       { path: 'emails/:siteId/edit', component: SiteEmailFormComponent, resolve: {email: EmailResolve} },
//       { path: 'web-sites', component: SiteWebListComponent },
//       { path: 'web-sites/create', component: SiteWebFormComponent },
//       { path: 'web-sites/:siteId/edit', component: SiteWebFormComponent, resolve: { webSite: WebSiteResolve} },
//       { path: 'phones/create', component: SitePhoneFormComponent},
//       { path: 'phones/:siteId/edit', component: SitePhoneFormComponent, resolve: {phone: PhoneResolve }},
//       { path: 'phones', component: SitePhoneListComponent},
//     ]}
// ];
//
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
//
// export class SiteRoutingModule { }
