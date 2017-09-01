import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {MenuComponent} from "./menu.component";
import {MenuService} from "./menu.service";
import {MenuRepository} from "./menu.repository";
import {RouterModule} from "@angular/router";
import {SideMenuComponent} from "./side/side.menu.component";
import {TopMenuComponent} from "./top/top.menu.component";
import {MobileMenuComponent} from "./mobile/mobile.menu.component";
import {InsideMenuComponent} from "./top/inside/inside.menu.component";
import {FrontMenuComponent} from "./top/front/front.menu.component";


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
  ],
  declarations: [
    FrontMenuComponent,
    InsideMenuComponent,
    MobileMenuComponent,
    TopMenuComponent,
    SideMenuComponent,
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
    FrontMenuComponent,
    InsideMenuComponent,
    MobileMenuComponent,
    TopMenuComponent,
    SideMenuComponent,
    MenuComponent
  ]
})
export class MenuModule {}