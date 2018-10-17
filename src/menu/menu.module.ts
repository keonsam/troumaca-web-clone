import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {RouterModule} from '@angular/router';
import {TopMenuComponent} from './top/top.menu.component';
import {MobileMenuComponent} from './mobile/mobile.menu.component';
import {SideMenuComponent} from './side/side.menu.component';
import {SearchModule} from '../search/search.module';
import {userServiceProvider} from '../parties/users/user.service.provider';
import {photoServiceProvider} from '../photo/photo.service.provider';
import {billingDetailsServiceProvider} from '../billing-details/billing-details.service.provider';
import { eventServiceProvider } from '../event/event.service.provider';
import {menuServiceProvider} from "./menu.service.provider";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SearchModule,
  ],
  declarations: [
    MobileMenuComponent,
    TopMenuComponent,
    SideMenuComponent,
    MenuComponent
  ],
  providers: [menuServiceProvider, userServiceProvider, photoServiceProvider, billingDetailsServiceProvider, eventServiceProvider],
  exports: [
    MobileMenuComponent,
    TopMenuComponent,
    SideMenuComponent,
    MenuComponent
  ]
})
export class MenuModule {}
