import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {RouterModule} from '@angular/router';
import {TopMenuComponent} from './top/top.menu.component';
import {MobileMenuComponent} from './mobile/mobile.menu.component';
import {SideMenuComponent} from './side/side.menu.component';
import {SearchModule} from '../search/search.module';
import {MessageModule} from '../message/message.module';
import {SettingModule} from '../setting/setting.module';
import {menuServiceProvider} from './menu.service.provider';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    SearchModule,
    MessageModule,
    SettingModule
  ],
  declarations: [
    MobileMenuComponent,
    TopMenuComponent,
    SideMenuComponent,
    MenuComponent
  ],
  providers: [menuServiceProvider],
  exports: [
    MobileMenuComponent,
    TopMenuComponent,
    SideMenuComponent,
    MenuComponent
  ]
})
export class MenuModule {}
