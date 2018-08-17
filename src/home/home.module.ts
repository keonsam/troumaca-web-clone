import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {FrontHomeComponent} from './front-home/front.home.component';
import { LobbyHomeComponent} from "./lobby-home/lobby.home.component";
import {homeServiceProvider} from "./home.service.provider";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    FrontHomeComponent,
    LobbyHomeComponent
  ],
  providers: [homeServiceProvider],
  exports: [
    HomeComponent,
    FrontHomeComponent,
    LobbyHomeComponent
  ]
})
export class HomeModule {}
