import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LobbyHomeComponent} from "./lobby-home/lobby.home.component";
import {PageNotFoundComponent} from "./page-not-found/page.not.found.component";
import {AssetComponent} from "../assets/asset.component";
import {AssetTypeComponent} from "../asset-types/asset.type.component";
import {AttributeComponent} from "../attributes/attribute.component";
import {AssetTypeClassComponent} from "../asset-type-classes/asset.type.class.component";
import {SiteComponent} from "../site/site.component";
import {AssetListComponent} from "../assets/asset-list/asset.list.component";
import {AssetCreationComponent} from "../assets/asset-creation/asset.creation.component";
import {AssetTypeListComponent} from "../asset-types/asset-type-list/asset.type.list.component";
import {AssetTypeCreationComponent} from "../asset-types/asset-type-creation/asset.type.creation.component";
import {AssetTypeClassCreationComponent} from "../asset-type-classes/asset-type-class-creation/asset.type.class.creation.component";
import {AssetTypeClassListComponent} from "../asset-type-classes/asset-type-class-list/asset.type.class.list.component";
import {AssetTypeClassEditComponent} from "../asset-type-classes/asset-type-class-edit/asset.type.class.edit.component";
import {SiteCreationComponent} from "../site/site-creation/site.creation.component";
import {AttributeListComponent} from "../attributes/attribute-list/attribute.list.component";
import {AttributeCreationComponent} from "../attributes/attribute-creation/attribute.creation.component";
import {SitePostOfficeBoxListComponent} from "../site/site-post-office-box-list/site.post.office.box.list.component";
import {SiteEmailListComponent} from "../site/site-email-list/site.email.list.component";
import {SiteWebListComponent} from "../site/site-web-list/site.web.list.component";
import {SitePhoneListComponent} from "../site/site-phone-list/site.phone.list.component";
import {SiteStreetAddressListComponent} from "../site/site-street-address-list/site.street.address.list.component";
import {SitePhoneCreationComponent} from "../site/site-phone-creation/site.phone.creation.component";


const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: LobbyHomeComponent },
  { path: 'assets', component: AssetComponent, children: [
    { path: '',redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: AssetListComponent },
    { path: 'create', component: AssetCreationComponent }
  ]},
  { path: 'asset-types', component: AssetTypeComponent,  children: [
      { path: '',redirectTo: 'listing', pathMatch: 'full' },
      { path: 'listing', component: AssetTypeListComponent },
      { path: 'create', component: AssetTypeCreationComponent }
  ]},
  { path: 'asset-type-classes', component: AssetTypeClassComponent, children:[
    { path: '', redirectTo: 'listing', pathMatch: 'full'},
    { path: 'listing', component: AssetTypeClassListComponent },
    { path: 'create', component: AssetTypeClassCreationComponent },
    { path: 'edit/:id', component: AssetTypeClassEditComponent }
  ]},
  { path: 'attributes', component: AttributeComponent, children:[
      { path: '', redirectTo: 'listing', pathMatch: 'full'},
      { path: 'listing', component: AttributeListComponent },
      { path: 'create', component: AttributeCreationComponent }
  ]},
  { path: 'sites', component: SiteComponent, children:[
    { path: '', redirectTo: 'street-addresses', pathMatch: 'full'},
    { path: 'street-addresses', component: SiteStreetAddressListComponent },
    { path: 'post-office-boxes', component: SitePostOfficeBoxListComponent },
    { path: 'emails', component: SiteEmailListComponent },
    { path: 'web-sites', component: SiteWebListComponent },
    { path: 'phones', component: SitePhoneListComponent},
    { path: 'phones/create', component: SitePhoneCreationComponent},
    { path: 'create', component: SiteCreationComponent }
  ]},
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
