import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {LeftMenuComponent} from "./left.menu.component";
import {LeftMenuService} from "./left.menu.service";
import {LeftMenuRepository} from "./left.menu.repository";
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
  ],
  declarations: [
    LeftMenuComponent
  ],
  providers: [{
    provide: LeftMenuService,
    useFactory(leftMenuRepository:LeftMenuRepository) {
      let leftMenuService: LeftMenuService;
      if (!leftMenuService) {
        leftMenuService = new LeftMenuService(leftMenuRepository);
      }
      return leftMenuService;
    },
    deps: [LeftMenuRepository]
  }],
  exports: [LeftMenuComponent]
})
export class LeftMenuModule {}