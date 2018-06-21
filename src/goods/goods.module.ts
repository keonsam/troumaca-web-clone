import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GoodsComponent} from './goods.component';
import {GoodsService} from './goods.service';
import {GoodsRepository} from './goods.repository';
import {goodsRouting} from './goods.routing';
import {RouterModule} from '@angular/router';
import {LeftMenuModule} from '../left-menu/left.menu.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    goodsRouting,
    LeftMenuModule
  ],
  declarations: [
    GoodsComponent
  ],
  providers: [{
    provide: GoodsService,
    useFactory(goodsRepository: GoodsRepository) {
      let goodsService: GoodsService;
      if (!goodsService) {
        goodsService = new GoodsService(goodsRepository);
      }
      return goodsService;
    },
    deps: [GoodsRepository]
  }],
  exports: [
    GoodsComponent
  ]
})
export class GoodsModule {}
