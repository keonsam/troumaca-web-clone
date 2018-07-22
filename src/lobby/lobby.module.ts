import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import { LobbyComponent } from './lobby.component';
import {LobbyHomeComponent} from './lobby-home/lobby.home.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenuModule
  ],
  declarations: [
    LobbyComponent,
    LobbyHomeComponent,
  ],
  providers: [],
  exports: [
    LobbyComponent,
    LobbyHomeComponent,
  ]
})
export class HomeModule {}
