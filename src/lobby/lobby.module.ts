import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { LobbyComponent } from './lobby.component';
import { lobbyServiceProvider} from './lobby.service.provider';
import {LobbyRoutingModule} from "./lobby.routing.module";
import {BillingModalModule} from "../billing-details/billing-modal/billing-modal.module";
import {authGuardProvider} from "../auth-guard/auth.guard.provider";
import {MenuModule} from "../menu/menu.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LobbyRoutingModule,
    BillingModalModule,
    MenuModule
  ],
  declarations: [
    LobbyComponent
  ],
  providers: [lobbyServiceProvider, authGuardProvider],
  exports: []
})

export class LobbyModule {}
