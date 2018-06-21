import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AssetTypeComponent} from './asset.type.component';


export const assetTypesRoutes: Routes = [
  {path: '', redirectTo: 'asset-types', pathMatch: 'full'},
  {path: 'asset-types', component: AssetTypeComponent}
];

export const assetTypesRouting: ModuleWithProviders = RouterModule.forChild(assetTypesRoutes);
