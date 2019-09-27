import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {menuServiceProvider} from './menu.service.provider';
import {MaterialModule} from '../app/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LogoComponent} from './logo/logo.component';
import { MainMenuComponent } from './main/main.menu.component';
import {MenuComponent} from './menu.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { TopMenuComponent } from './top/top.menu.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    MenuComponent,
    LogoComponent,
    MainMenuComponent,
    TopMenuComponent
  ],
  providers: [
    menuServiceProvider,
  ],
  exports: [
    MenuComponent,
    LogoComponent,
    MainMenuComponent,
    TopMenuComponent
  ]
})
export class MenuModule {}
