import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../app/material.module';
import { LobbyComponent } from './lobby.component';
import { lobbyServiceProvider} from './lobby.service.provider';
import {LobbyRoutingModule} from "./lobby.routing.module";
import {BillingModalModule} from "../billing-details/billing-modal/billing-modal.module";
import {billingDetailsServiceProvider} from "../billing-details/billing-details.service.provider";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LobbyRoutingModule,
    MaterialModule,
    BillingModalModule
  ],
  declarations: [
    LobbyComponent
  ],
  providers: [lobbyServiceProvider, billingDetailsServiceProvider],
  exports: []
})

export class LobbyModule {}
