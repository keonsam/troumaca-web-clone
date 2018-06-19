import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {GoodsComponent} from './goods.component';
import {AuthGuard} from '../auth-guard/auth.guard';
import {assetsRoutes} from '../assets/asset.routing';
import {assetTypesRoutes} from '../asset-types/asset.type.routing';

const goodsRoutes: Routes = [
  {path: 'goods',
   canActivate: [AuthGuard],
   canActivateChild: [AuthGuard],
   component: GoodsComponent,
   children: assetTypesRoutes.concat(assetsRoutes)},
];

export const goodsRouting: ModuleWithProviders = RouterModule.forChild(goodsRoutes);
