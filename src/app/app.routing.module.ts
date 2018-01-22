import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LobbyHomeComponent} from "./lobby-home/lobby.home.component";
import {PageNotFoundComponent} from "./page-not-found/page.not.found.component";
import {AssetComponent} from "../assets/asset.component";
import {AssetTypeComponent} from "../asset-types/asset.type.component";
import {AttributeComponent} from "../attributes/attribute.component";
import {AssetTypeClassComponent} from "../asset-type-classes/asset.type.class.component";
import {SiteComponent} from "../site/site.component";
import {AssetContentComponent} from "../assets/asset-content/asset.content.component";
import {AssetCreationComponent} from "../assets/asset-creation/asset.creation.component";
import {AssetTypeListComponent} from "../asset-types/asset-type-list/asset.type.list.component";
import {AssetTypeCreationComponent} from "../asset-types/asset-type-creation/asset.type.creation.component";
import {AssetTypeClassCreationComponent} from "../asset-type-classes/asset-type-class-creation/asset.type.class.creation.component";
import {AssetTypeClassListComponent} from "../asset-type-classes/asset-type-class-list/asset.type.class.list.component";

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: LobbyHomeComponent },
  { path: 'assets', component: AssetComponent, children: [
    { path: '',redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: AssetContentComponent },
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
    { path: 'create', component: AssetTypeClassCreationComponent }
  ]},
  { path: 'attributes', component: AttributeComponent },
  { path: 'sites', component: SiteComponent },
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
