import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssetCharacteristicComponent} from './asset.characteristic.component';
import {AuthGuard} from '../auth-guard/auth.guard';
import {AssetCharacteristicFormComponent} from './asset-characteristic-form/asset.characteristic.form.component';
import {AssetCharacteristicResolve} from './asset.characteristic.resolve';
import {AssetCharacteristicListComponent} from './asset-characteristic-listing/asset.characteristic.list.component';
import {AssetCharacteristicsResolve} from './asset.characteristics.resolve';
import {ASSET_CHARACTERISTICS} from '../app/routes';

export const routes: Routes = [
  { path: '', component: AssetCharacteristicComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: `/${ASSET_CHARACTERISTICS}/listing`, pathMatch: 'full' },
      { path: 'listing', component: AssetCharacteristicListComponent, resolve: { assetCharacteristics: AssetCharacteristicsResolve } },
      { path: 'create', component: AssetCharacteristicFormComponent },
      { path: ':assetCharacteristicId/edit', component: AssetCharacteristicFormComponent, resolve: {assetCharacteristic: AssetCharacteristicResolve} },
    ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssetCharacteristicRoutingModule { }
