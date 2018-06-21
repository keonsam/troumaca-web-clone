import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AssetTypeClassComponent} from './asset.type.class.component';


export const assetTypeClassRoutes: Routes = [
  {path: '', redirectTo: 'asset-type-classes', pathMatch: 'full'},
  {path: 'asset-type-classes', component: AssetTypeClassComponent}
];

export const assetTypeClassRouting: ModuleWithProviders = RouterModule.forChild(assetTypeClassRoutes);
