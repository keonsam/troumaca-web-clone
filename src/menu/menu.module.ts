import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {MenuComponent} from "./menu.component";
import {MenuService} from "./menu.service";
import {MenuRepository} from "./menu.repository";
import {RouterModule} from "@angular/router";
import {TopMenuComponent} from "./top/top.menu.component";
import {MobileMenuComponent} from "./mobile/mobile.menu.component";
import {SideMenuLogoComponent} from "./side/logo/side.menu.logo.component";
import {SideMenuComponent} from "./side/side.menu.component";
import {SideMenuUserComponent} from "./user/side.menu.user.component";
import {SideMenuMainComponent} from "./side/main/side.menu.main.component";
import {SearchModule} from "../search/search.module";
import {AvatarMenuComponent} from "./avatar/avatar.menu.component";
import {MessageModule} from "../message/message.module";
import {SettingModule} from "../setting/setting.module";


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
    SideMenuLogoComponent,
    SideMenuUserComponent,
    SideMenuMainComponent,
    AvatarMenuComponent,
    MenuComponent
  ],
  providers: [{
    provide: MenuService,
    useFactory(menuRepository:MenuRepository) {
      let menuService: MenuService;
      if (!menuService) {
        menuService = new MenuService(menuRepository);
      }
      return menuService;
    },
    deps: [MenuRepository]
  }],
  exports: [
    MobileMenuComponent,
    TopMenuComponent,
    SideMenuComponent,
    SideMenuLogoComponent,
    SideMenuUserComponent,
    SideMenuMainComponent,
    MenuComponent
  ]
})
export class MenuModule {}