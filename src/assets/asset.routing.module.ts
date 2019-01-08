import {Routes, RouterModule} from '@angular/router';
import {AssetComponent} from './asset.component';
import {AssetListComponent} from "./asset-list/asset.list.component";
import {NgModule} from "@angular/core";
import {AssetFormComponent} from "./asset-form/asset.form.component";
import {AssetResolve} from "./asset.resolve";
import {AuthGuard} from "../auth-guard/auth.guard";
import {AssetBrandResolve} from "./asset.brand.resolve";
import {AssetCharacteristicsResolve} from "./asset.characteristics.resolve";
import {AssetSpecificationResolve} from "./asset.specification.resolve";

export const routes: Routes = [
  { path: '', component: AssetComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: '/assets/listing', pathMatch: 'full' },
      { path: 'listing', component: AssetListComponent },
      { path: 'create', component: AssetFormComponent },
      { path: ':assetId/edit', component: AssetFormComponent,
        resolve: { asset: AssetResolve,
          assetBrand: AssetBrandResolve,
          assetCharacteristics: AssetCharacteristicsResolve,
          assetSpecification: AssetSpecificationResolve
      } }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssetRoutingModule { }
