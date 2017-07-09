import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {MenuComponent} from "./menu.component";
import {MenuService} from "./menu.service";
import {MenuRepository} from "./menu.repository";


@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
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
  exports: [MenuComponent]
})
export class MenuModule {}