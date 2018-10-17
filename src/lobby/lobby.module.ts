import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { LobbyComponent } from './lobby.component';
import { lobbyServiceProvider} from './lobby.service.provider';
import {LobbyRoutingModule} from "./lobby.routing.module";
import {BillingModalModule} from "../billing-details/billing-modal/billing-modal.module";
import {billingDetailsServiceProvider} from "../billing-details/billing-details.service.provider";
import {authGuardProvider} from "../auth-guard/auth.guard.provider";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LobbyRoutingModule,
    BillingModalModule
  ],
  declarations: [
    LobbyComponent
  ],
  providers: [lobbyServiceProvider, billingDetailsServiceProvider, authGuardProvider],
  exports: []
})

export class LobbyModule {}
