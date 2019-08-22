import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SearchModule} from '../search/search.module';
import {userServiceProvider} from '../parties/users/user.service.provider';
import {photoServiceProvider} from '../parties/photo/photo.service.provider';
// import {billingDetailsServiceProvider} from '../billing-details/billing-details.service.provider';
import { eventServiceProvider } from '../event/event.service.provider';
import {menuServiceProvider} from './menu.service.provider';
import {MaterialModule} from '../app/material.module';
import {menuRepositoryProvider} from '../adapter/menu/menu.repository.adapter.provider';
import {menuClientProvider} from '../client/menus/menu.client.provider';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LogoComponent} from './logo/logo.component';
import {SideMenuComponent} from './side/side.menu.component';
import {MenuComponent} from './menu.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { TopMenuComponent } from './top/top.menu.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    SearchModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [
    // MobileMenuComponent,
    // TopMenuComponent,
    MenuComponent,
    LogoComponent,
    SideMenuComponent,
    TopMenuComponent
  ],
  providers: [
    menuServiceProvider,
    userServiceProvider,
    photoServiceProvider,
    // billingDetailsServiceProvider,
    eventServiceProvider,
    menuRepositoryProvider,
    menuClientProvider,
  ],
  exports: [
    // MobileMenuComponent,
    // TopMenuComponent,
    MenuComponent,
    LogoComponent,
    SideMenuComponent,
    TopMenuComponent
  ]
})
export class MenuModule {}
