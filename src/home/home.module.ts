import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import { LobbyHomeComponent} from './lobby-home/lobby.home.component';
import {homeServiceProvider} from './home.service.provider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from '../app/material.module';
import { HomeRoutingModule } from "./home.routing.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HomeRoutingModule
  ],
  declarations: [
    LobbyHomeComponent
  ],
  providers: [homeServiceProvider],
  exports: []
})

export class HomeModule {}
