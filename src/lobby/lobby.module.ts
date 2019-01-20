import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { LobbyComponent } from './lobby.component';
import { lobbyServiceProvider} from './lobby.service.provider';
import {LobbyRoutingModule} from "./lobby.routing.module";
import {BillingModalModule} from "../billing-details/billing-modal/billing-modal.module";
import {MenuModule} from "../menu/menu.module";
import {MaterialModule} from "../app/material.module";
import {lobbyRepositoryProvider} from '../adapter/lobby/lobby.repository.adapter.provider';
import {lobbyClientProvider} from '../client/lobby/lobby.client.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LobbyRoutingModule,
    BillingModalModule,
    MenuModule,
    MaterialModule,
  ],
  declarations: [
    LobbyComponent
  ],
  providers: [
    lobbyServiceProvider,
    lobbyRepositoryProvider,
    lobbyClientProvider
  ],
  exports: []
})

export class LobbyModule {}
