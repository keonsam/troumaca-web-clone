import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {LobbyHomeComponent} from "./lobby.home.component";
import {MenuModule} from "../../menu/menu.module";

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
    LobbyHomeComponent
  ],
  providers: [],
  exports: [
    LobbyHomeComponent
  ]
})
export class LobbyHomeModule {}