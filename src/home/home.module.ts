import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MenuModule} from "../menu/menu.module";
import {LobbyHomeComponent} from "./lobby-home/lobby.home.component";
import {FrontHomeComponent} from "./front-home/front.home.component";


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule
  ],
  declarations: [
    HomeComponent,
    LobbyHomeComponent,
    FrontHomeComponent
  ],
  providers: [],
  exports: [
    HomeComponent,
    LobbyHomeComponent,
    FrontHomeComponent
  ]
})
export class HomeModule {}